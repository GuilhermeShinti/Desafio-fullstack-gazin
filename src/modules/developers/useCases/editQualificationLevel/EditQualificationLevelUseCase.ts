import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IQualificationLevel } from "../../dtos/IQualificationLevel";
import { QualificationLevel } from "../../infra/typeorm/entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";

@injectable()
class EditQualificationLevelUseCase {
    constructor(
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: IQualificationLevelsRepository
    ) {}

    async execute({ id, level }: IQualificationLevel): Promise<QualificationLevel> {
        const qualificationLevel = await this.qualificationLevelsRepository.findById(id);
        if (!qualificationLevel) {
            throw new AppError("O nível informado não existe.");
        }

        qualificationLevel.level = level;

        const updatedQualificationLevel = await this.qualificationLevelsRepository.update(qualificationLevel);

        return updatedQualificationLevel;
    }
}

export { EditQualificationLevelUseCase };