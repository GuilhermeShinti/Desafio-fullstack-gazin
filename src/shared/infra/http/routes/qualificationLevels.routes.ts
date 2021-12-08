import { Router } from "express";
import { CreateQualificationLevelController } from "../../../../modules/developers/useCases/createQualificationLevel/CreateQualificationLevelController";

const qualificationLevelsRoutes = Router();

const createQualificationLevelController = new CreateQualificationLevelController();

qualificationLevelsRoutes.post("/", createQualificationLevelController.handle)


export { qualificationLevelsRoutes };