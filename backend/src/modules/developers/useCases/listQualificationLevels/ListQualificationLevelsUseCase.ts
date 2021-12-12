import { inject, injectable } from "tsyringe";
import { IFilter } from "../../../../shared/dtos/IFilter";
import { IPagination } from "../../../../shared/dtos/IPagination";
import { QualificationLevel } from "../../infra/typeorm/entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";


@injectable()
class ListQualificationLevelsUseCase {
    constructor(
        @inject("QualificationLevelsRepository")
        private qualificationlevelsRepository: IQualificationLevelsRepository
    ) {}

    async execute(filter?: IFilter): Promise<IPagination<QualificationLevel>> {
        const qualificationLevels = await this.qualificationlevelsRepository.getAll(filter);
        return qualificationLevels;
    }
}

export { ListQualificationLevelsUseCase };