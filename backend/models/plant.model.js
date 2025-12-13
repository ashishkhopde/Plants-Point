import { Schema, model } from "mongoose";

const PlantShema = new Schema({
    plantName : {
        type: String,
        required: true
    },
    plantImage : {
        type: String,
        required: true
    },
    plantDescription : {
        type: String,
        required: true
    },
    plantPrice : {
        type: Number,
        required: true
    },
    isMain:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default model("Plant", PlantShema);