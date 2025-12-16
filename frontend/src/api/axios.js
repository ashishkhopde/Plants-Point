import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor → attach access token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor → refresh token if expired
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if token expired & not retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/generateToken`, {
                    refreshToken,
                });

                const newAccessToken = res.data.accessToken;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    API.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return API(originalRequest); // retry the original request
                }
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                localStorage.clear();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default API;
