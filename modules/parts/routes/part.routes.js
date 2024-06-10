import { Router } from "express";
import { getPartsController, getPartByIdController } from "../controllers/part.controller.js";

const router = Router();


router.get('/parts', getPartsController);
router.get('/parts/:id', getPartByIdController);


export default router;