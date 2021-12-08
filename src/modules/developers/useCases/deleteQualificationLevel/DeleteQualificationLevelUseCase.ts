import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";


@injectable()
class DeleteQualificationLevelUseCase {
    constructor(
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: IQualificationLevelsRepository
    ) {}

    async execute(id: number): Promise<void> {
        const qualificationLevel = await this.qualificationLevelsRepository.findById(id);
        if (!qualificationLevel) {
            throw new AppError("O nível informado não existe.")
        }

        await this.qualificationLevelsRepository.delete(qualificationLevel.id);
    }
}

export { DeleteQualificationLevelUseCase };