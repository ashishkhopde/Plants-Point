import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/456/700/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-logo.png"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    next();
});

export default model("User", userSchema);