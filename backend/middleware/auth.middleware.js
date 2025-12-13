import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header missing or invalid" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.res.status(401).json({ message: "Unauthorized" });
        }

        if (decoded.exp < Date.now() / 1000) {
            return res.res.status(401).json({ message: "Unauthorized" });
        }

        req.user = {id: decoded.id};

        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(500).json({ message: "Authentication error", err });
    }
}