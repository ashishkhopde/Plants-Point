import userModel from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/genterateTokens.js";

import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
    try {
        const { name, avatar, email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            return res.json({ message: "User already exist!" });
        }

        const newUser = await userModel.create({
            name, avatar, email, password
        });

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        await userModel.updateOne({ _id: newUser._id }, { $set: { refreshToken: refreshToken } });

        return res.status(200).json({
            message: "User register successfully",
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log("User register err: ", error);
        res.json({
            message: "User register err",
            error
        });
    }
}

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
        user.save();

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

        const { refreshToken } = req.body;

        const user = await userModel.findOne({ refreshToken }).select("-password");

        if (!user) {
            return res.json({ message: "User not found" });
        }

        return res.json({ message: "Get user details successfully", user });

    } catch (error) {
        console.log("Get user err: ", error);
        return res.json({ message: "Get user err: ", error });
    }
}