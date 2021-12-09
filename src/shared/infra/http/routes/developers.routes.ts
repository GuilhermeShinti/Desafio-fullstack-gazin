import { Router } from "express";
import { CreateDeveloperController } from "../../../../modules/developers/useCases/createDeveloper/CreateDeveloperController";



const developersRoutes = Router();

const createDeveloperController = new CreateDeveloperController()

developersRoutes.post("/", createDeveloperController.handle);

export { developersRoutes };