import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteDeveloperUseCase } from "./DeleteDeveloperUseCase";

class DeleteDeveloperController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        const deleteDeveloperUseCase = container.resolve(DeleteDeveloperUseCase);
        await deleteDeveloperUseCase.execute(id);
        return response.status(204).json({message: "Desenvolvedor removido com sucesso."});
    }
}

export { DeleteDeveloperController };