import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListQualificationLevelsUseCase } from "./ListQualificationLevelsUseCase";
import url from "url";

class ListQualificationLevelsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const page = parseInt(request.query.page as string);
        const limit = parseInt(request.query.limit as string);
        const filter = { page, limit }

        const listQualificationLevelsUseCase = await container.resolve(ListQualificationLevelsUseCase);
        const qualificationLevels = await listQualificationLevelsUseCase.execute(filter);
        return response.status(200).json(qualificationLevels);
    }
}

export { ListQualificationLevelsController };