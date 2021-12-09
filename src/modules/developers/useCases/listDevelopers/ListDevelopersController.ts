import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDevelopersUseCase } from "./ListDevelopersUseCase";

class ListDevelopersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listDevelopersUseCase = container.resolve(ListDevelopersUseCase);
        const developers = await listDevelopersUseCase.execute();
        return response.status(200).json(developers);
    }
}

export { ListDevelopersController };