import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListQualificationLevelsUseCase } from "./ListQualificationLevelsUseCase";
import url from "url";


class ListQualificationLevelsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const queryString = url.parse(request.url, true);
        console.log(queryString);
        console.log(JSON.parse(JSON.stringify(queryString)));
        const listQualificationLevelsUseCase = await container.resolve(ListQualificationLevelsUseCase);
        const qualificationLevels = await listQualificationLevelsUseCase.execute();
        return response.status(200).json(qualificationLevels);
    }
}

export { ListQualificationLevelsController };