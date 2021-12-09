import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDeveloperUseCase } from "./CreateDeveloperUsecase";



class CreateDeveloperController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id, name, gender, birthdate, hobby, qualificationLevelId } = request.body;

        const createDeveloperUsecase = container.resolve(CreateDeveloperUseCase);

        const developer = await createDeveloperUsecase.execute({id, name, gender, birthdate, hobby, qualificationLevelId});

        return response.status(201).json(developer);
    }
}

export { CreateDeveloperController };