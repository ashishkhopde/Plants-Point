import { Router } from "express";
import { userSignup, userLogin, tokenGenerator, getUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/generateToken", tokenGenerator);
router.get("/", authMiddleware, getUser);


export default router;