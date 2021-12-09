import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateQualificationLevelUseCase } from "./CreateQualificationLevelUseCase";

class CreateQualificationLevelController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id, level } = request.body;

        const createQualificationLevelUseCase = container.resolve(CreateQualificationLevelUseCase)

        const qualificationLevel = await createQualificationLevelUseCase.execute({ id, level });

        return response.status(201).json(qualificationLevel);
    }
}

export { CreateQualificationLevelController };