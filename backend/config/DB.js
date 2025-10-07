import mongoose from "mongoose";
import 'dotenv/config.js'

export default function ConnectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB connected...");
    })
}