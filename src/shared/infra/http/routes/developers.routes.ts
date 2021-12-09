import { Router } from "express";
import { CreateDeveloperController } from "../../../../modules/developers/useCases/createDeveloper/CreateDeveloperController";
import { ListDevelopersController } from "../../../../modules/developers/useCases/listDevelopers/ListDevelopersController";



const developersRoutes = Router();

const createDeveloperController = new CreateDeveloperController();
const listDevelopersController = new ListDevelopersController();

developersRoutes.post("/", createDeveloperController.handle);
developersRoutes.get("/", listDevelopersController.handle);

export { developersRoutes };