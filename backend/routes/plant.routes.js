import { Router } from "express";
import { adminMiddleware } from "../middleware/adminAuth.middleware.js";
import { addPlant, deletePlant, editPlant, getPlants } from "../controllers/plant.controller.js";

const router = Router();

router.get('/list', getPlants);
router.post('/add', adminMiddleware, addPlant);
router.delete('/delete/:id', adminMiddleware, deletePlant);
router.put('/edit/:id', adminMiddleware, editPlant);

export default router;