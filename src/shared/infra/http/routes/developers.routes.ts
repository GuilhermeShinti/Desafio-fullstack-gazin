import { Router } from "express";
import { CreateDeveloperController } from "../../../../modules/developers/useCases/createDeveloper/CreateDeveloperController";
import { DeleteDeveloperController } from "../../../../modules/developers/useCases/deleteDeveloper/DeleteDeveloperController";
import { ListDevelopersController } from "../../../../modules/developers/useCases/listDevelopers/ListDevelopersController";



const developersRoutes = Router();

const createDeveloperController = new CreateDeveloperController();
const listDevelopersController = new ListDevelopersController();
const deleteDeveloperController = new DeleteDeveloperController();

developersRoutes.post("/", createDeveloperController.handle);
developersRoutes.get("/", listDevelopersController.handle);
developersRoutes.delete("/:id", deleteDeveloperController.handle);

export { developersRoutes };