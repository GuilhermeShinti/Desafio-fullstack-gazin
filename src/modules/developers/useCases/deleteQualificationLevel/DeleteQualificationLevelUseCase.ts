import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { DevelopersRepository } from "../../infra/typeorm/repositories/DevelopersRepository";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";


@injectable()
class DeleteQualificationLevelUseCase {
    constructor(
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: IQualificationLevelsRepository,
        @inject("DevelopersRepository")
        private developersRepository: DevelopersRepository
    ) {}

    async execute(id: number): Promise<void> {
        const qualificationLevel = await this.qualificationLevelsRepository.findById(id);
        if (!qualificationLevel) {
            throw new AppError("O nível informado não existe.")
        }

        const developers = await this.developersRepository.findByQualificationLevelId(qualificationLevel.id);
        if (Array.isArray(developers) && developers.length > 0) {
            throw new AppError("O nível não pode ser excluido, pois há desenvolvedores associados à ele.")
        }

        await this.qualificationLevelsRepository.delete(qualificationLevel.id);
    }
}

export { DeleteQualificationLevelUseCase };