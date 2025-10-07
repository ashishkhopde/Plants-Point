import { Router } from "express";
import PlantModel from "../models/plantModel.js";

const router = Router();

router.get('/list', async (req, res) => {
    res.json({
        status: "success",
        plantData: await PlantModel.find()
    });
});

router.post('/add', async (req, res) => {

    let data = req.body;

    let plant = new PlantModel(data);
    await plant.save();

    res.json({
        status: "success",
        message: "Plant added successfully",
        newPlant: plant
    });
});

router.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;

    await PlantModel.findByIdAndDelete(id);

    res.json({
        status: "success",
        message: "Plant deleted successfully",
    });
});

router.put('/edit/:id', async (req, res)=>{
    let id = req.params.id;
    let data = req.body;

    let editData = await PlantModel.findByIdAndUpdate(id, data);

    res.json({
        status: "success",
        message: "Item was edited successfully",
        editData: editData
    });
});

export default router;