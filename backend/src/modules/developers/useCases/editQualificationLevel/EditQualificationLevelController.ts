import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditQualificationLevelUseCase } from "./EditQualificationLevelUseCase";

class EditQualificationLevelController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        const { level } = request.body;
        const editQualificationLevelUseCase = container.resolve(EditQualificationLevelUseCase);
        const qualificationLevel = await editQualificationLevelUseCase.execute({ id, level });

        return response.status(200).json(qualificationLevel);
    }
}

export { EditQualificationLevelController };