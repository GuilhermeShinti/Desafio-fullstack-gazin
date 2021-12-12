import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDevelopersUseCase } from "./ListDevelopersUseCase";

class ListDevelopersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const page = parseInt(request.query.page as string);
        const limit = parseInt(request.query.limit as string);
        const filter = { page, limit }

        const listDevelopersUseCase = container.resolve(ListDevelopersUseCase);
        const developers = await listDevelopersUseCase.execute(filter);
        return response.status(200).json(developers);
    }
}

export { ListDevelopersController };