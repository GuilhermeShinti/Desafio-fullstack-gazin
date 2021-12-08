import { inject, injectable } from "tsyringe";
import { QualificationLevel } from "../../infra/typeorm/entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";

@injectable()
class ListQualificationLevelsUseCase {
    constructor(
        @inject("QualificationLevelsRepository")
        private qualificationlevelsRepository: IQualificationLevelsRepository
    ) {}

    async execute(): Promise<QualificationLevel[]> {
        const qualificationLevels = await this.qualificationlevelsRepository.list();
        return qualificationLevels;
    }
}

export { ListQualificationLevelsUseCase };