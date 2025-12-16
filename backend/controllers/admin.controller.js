import "dotenv/config";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/genterateTokens.js";

export const adminLogin = async (req, res) => {
    const userName = process.env.ADMIN_ID;
    const userPass = process.env.ADMIN_PASSWORD

    const { adminId, adminPassword } = req.body;

    if (userName !== adminId) {
        return res.json({ message: "Invalid User ID" });
    }
    if (!await bcrypt.compare(adminPassword, userPass)) {
        return res.json({ message: "Invalid User Password" });
    }

    const accessToken = generateAccessToken(userName);

    return res.status(200).json({
        message : "Admin login successful",
        accessToken
    });
}
