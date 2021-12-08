import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateQualificationLevel } from "../../dtos/ICreateQualificationLevel";
import { QualificationLevel } from "../../infra/typeorm/entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";



@injectable()
class CreateQualificationLevelUseCase {
    constructor(
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: IQualificationLevelsRepository
    ) {} 

    async execute({ id, level }: ICreateQualificationLevel): Promise<QualificationLevel> {
        if (!level) {
            throw new AppError("O nível deve ser informado");
        }

        const qualificationLevelAlreadyExists = await this.qualificationLevelsRepository.findByQualificationName(level);

        if (qualificationLevelAlreadyExists) {
            throw new AppError("O nível informado já existe");
        }

        const qualificationLevel = this.qualificationLevelsRepository.create({id, level});
        
        return qualificationLevel;
    }
}

export { CreateQualificationLevelUseCase };