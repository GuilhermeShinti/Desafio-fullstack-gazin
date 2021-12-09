import { Router } from "express";
import { CreateDeveloperController } from "../../../../modules/developers/useCases/createDeveloper/CreateDeveloperController";
import { DeleteDeveloperController } from "../../../../modules/developers/useCases/deleteDeveloper/DeleteDeveloperController";
import { EditDeveloperController } from "../../../../modules/developers/useCases/editDeveloper/EditDeveloperController";
import { ListDevelopersController } from "../../../../modules/developers/useCases/listDevelopers/ListDevelopersController";


const developersRoutes = Router();

const createDeveloperController = new CreateDeveloperController();
const listDevelopersController = new ListDevelopersController();
const deleteDeveloperController = new DeleteDeveloperController();
const editDeveloperController = new EditDeveloperController();

developersRoutes.post("/", createDeveloperController.handle);
developersRoutes.get("/", listDevelopersController.handle);
developersRoutes.delete("/:id", deleteDeveloperController.handle);
developersRoutes.put("/:id", editDeveloperController.handle);


export { developersRoutes };