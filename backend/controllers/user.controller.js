import userModel from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/genterateTokens.js";

import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
    try {
        const { name, avatar, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists!" });
        }

        const newUser = await userModel.create({ name, avatar, email, password });

        const accessToken = await generateAccessToken(newUser._id);
        const refreshToken = await generateRefreshToken(newUser._id);

        newUser.refreshToken = refreshToken;
        await newUser.save();

        return res.status(200).json({
            message: "User registered successfully",
            accessToken,
            refreshToken,
        });

    } catch (error) {
        console.error("User register err: ", error);
        return res.status(500).json({
            message: "User register error",
            error: error.message,
        });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ message: "User not found!" });
        }

        if (! await bcrypt.compare(password, user.password)) {
            return res.json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200).json({
            message: "User login successfully",
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log("User login err: ", error);
        res.json({
            message: "User login err",
            error
        });
    }
}

export const tokenGenerator = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        if (refreshToken.exp < Date.now() / 1000) {
            return res.json({ message: "Refresh token expired" });
        }

        const user = await userModel.findOne({ refreshToken: refreshToken });

        if (!user) {
            return res.json({
                message: "User not found"
            });
        }

        const accessToken = generateAccessToken(user._id);

        return res.status(200).json({
            message: "Token generated successfully",
            accessToken
        });
    } catch (error) {
        console.log("Generate token err: ", error);
        return res.json({ message: "Generate token err: ", error });
    }
}

export const getUser = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const user = await userModel.findById(userId).select("-password -refreshToken");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            message: "Get user details successfully",
            user,
        });

    } catch (error) {
        console.log("Get user err: ", error);
        return res.json({ message: "Get user err: ", error });
    }
}