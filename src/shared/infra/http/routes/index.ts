import { Router } from "express";
import { qualificationLevelsRoutes } from "./qualificationLevels.routes";


const router = Router();

router.use("/levels", qualificationLevelsRoutes);

export { router };