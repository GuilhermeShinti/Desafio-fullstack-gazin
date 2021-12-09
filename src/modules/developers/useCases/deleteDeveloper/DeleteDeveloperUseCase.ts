import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { DevelopersRepository } from "../../infra/typeorm/repositories/DevelopersRepository";

@injectable()
class DeleteDeveloperUseCase {
    constructor(
        @inject("DevelopersRepository")
        private developersRepository: DevelopersRepository
    ){}

    async execute(id: number): Promise<void> {
        const developer = await this.developersRepository.findById(id);
        if (!developer) {
            throw new AppError("O desenvolvedor informado não existe.")
        }

        await this.developersRepository.delete(developer.id);
    }
}

export { DeleteDeveloperUseCase };