import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteQualificationLevelUseCase } from "./DeleteQualificationLevelUseCase";

class DeleteQualificationLevelController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        const deleteQualificationLevelUseCase = container.resolve(DeleteQualificationLevelUseCase);
        await deleteQualificationLevelUseCase.execute(id);
        return response.status(204).json({message: "Nível removido com sucesso."});
    }
}

export { DeleteQualificationLevelController };