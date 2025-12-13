import jwt from "jsonwebtoken";
import "dotenv/config"

export const generateAccessToken = async (id) =>{
    try {
        return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3h"});
    } catch (err) {
        console.log("Access Token Error: ", err);
    }
}

export const generateRefreshToken = async (id) => {
    try {
        return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
    } catch (err) {
        console.log("Refresh Token Error: ", err);
    }
}