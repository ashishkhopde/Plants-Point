import PlantModel from "../models/plant.model.js";

export const getPlants = async (req, res) => {
    res.json({
        status: "success",
        plantData: await PlantModel.find()
    });
}

export const addPlant = async (req, res) => {

    let data = req.body;

    if (data.isMain === true) {
        await PlantModel.updateMany({}, { isMain: false });
    }

    let plant = new PlantModel(data);
    await plant.save();

    res.json({
        status: "success",
        message: "Plant added successfully",
        newPlant: plant
    });
}

export const deletePlant = async (req, res) => {
    let id = req.params.id;

    await PlantModel.findByIdAndDelete(id);

    res.json({
        status: "success",
        message: "Plant deleted successfully",
    });
}

export const editPlant = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    if (data.isMain === true) {
        await PlantModel.updateMany({}, { isMain: false });
    }

    let editData = await PlantModel.findByIdAndUpdate(id, data);

    res.json({
        status: "success",
        message: "Item was edited successfully",
        editData: editData
    });
}