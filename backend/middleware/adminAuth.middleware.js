import "dotenv/config";
import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws if expired or invalid
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);

    // TokenExpiredError will be thrown by jwt.verify if the token is expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    }

    return res.status(401).json({ message: "Authentication failed", error: err.message });
  }
};
