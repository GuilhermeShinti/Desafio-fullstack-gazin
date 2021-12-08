import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListQualificationLevelsUseCase } from "./ListQualificationLevelsUseCase";


class ListQualificationLevelsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listQualificationLevelsUseCase = await container.resolve(ListQualificationLevelsUseCase);
        const qualificationLevels = await listQualificationLevelsUseCase.execute();
        return response.status(200).json(qualificationLevels);
    }
}

export { ListQualificationLevelsController };