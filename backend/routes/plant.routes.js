import { Router } from "express";
import { addPlant, deletePlant, editPlant, getPlants } from "../controllers/plant.controller.js";

const router = Router();

router.get('/list', getPlants);

router.post('/add', addPlant);

router.delete('/delete/:id', deletePlant);

router.put('/edit/:id', editPlant);

export default router;