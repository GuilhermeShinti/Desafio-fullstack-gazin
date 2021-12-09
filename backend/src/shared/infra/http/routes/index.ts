import { Router } from "express";
import { developersRoutes } from "./developers.routes";
import { qualificationLevelsRoutes } from "./qualificationLevels.routes";


const router = Router();

router.use("/levels", qualificationLevelsRoutes);
router.use("/developers", developersRoutes);

export { router };