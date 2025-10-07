import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const PlantShema = new Schema({
    plantName : String,
    plantImage : String,
    plantDescription : String,
    plantPrice : Number,
})

export default model("Plant", PlantShema);