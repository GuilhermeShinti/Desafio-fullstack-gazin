import { Router } from "express";
import { CreateQualificationLevelController } from "../../../../modules/developers/useCases/createQualificationLevel/CreateQualificationLevelController";
import { DeleteQualificationLevelController } from "../../../../modules/developers/useCases/deleteQualificationLevel/DeleteQualificationLevelController";
import { ListQualificationLevelsController } from "../../../../modules/developers/useCases/listQualificationLevels/ListQualificationLevelsController";


const qualificationLevelsRoutes = Router();

const createQualificationLevelController = new CreateQualificationLevelController();
const listQualificationLevelController = new ListQualificationLevelsController();
const deleteQualificationLevelController = new DeleteQualificationLevelController();

qualificationLevelsRoutes.get("/", listQualificationLevelController.handle);
qualificationLevelsRoutes.post("/", createQualificationLevelController.handle);
qualificationLevelsRoutes.delete("/", deleteQualificationLevelController.handle);


export { qualificationLevelsRoutes };