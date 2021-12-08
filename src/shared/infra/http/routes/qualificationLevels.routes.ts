import { Router } from "express";
import { CreateQualificationLevelController } from "../../../../modules/developers/useCases/createQualificationLevel/CreateQualificationLevelController";
import { ListQualificationLevelsController } from "../../../../modules/developers/useCases/listQualificationLevel/ListQualificationLevelsController";


const qualificationLevelsRoutes = Router();

const createQualificationLevelController = new CreateQualificationLevelController();
const listQualificationLevelController = new ListQualificationLevelsController();

qualificationLevelsRoutes.get("/", listQualificationLevelController.handle);
qualificationLevelsRoutes.post("/", createQualificationLevelController.handle);


export { qualificationLevelsRoutes };