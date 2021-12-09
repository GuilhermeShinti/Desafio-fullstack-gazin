import {Request, Response } from "express";
import { container } from "tsyringe";
import { EditDeveloperUseCase } from "./EditDeveloperUseCase";

class EditDeveloperController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        const { name, gender, birthdate, hobby, qualificationLevelId} = request.body;

        const editDeveloperUseCase = container.resolve(EditDeveloperUseCase);
        const developer = await editDeveloperUseCase.execute({id, name, gender, birthdate, hobby, qualificationLevelId});

        return response.status(200).json(developer);
    }
}

export { EditDeveloperController }