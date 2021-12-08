import { getRepository, Repository } from "typeorm";

import { QualificationLevel } from "../entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../../repositories/IQualificationLevelsRepository";
import { ICreateQualificationLevel } from "../../../dtos/ICreateQualificationLevel";

class QualificationLevelsRepository implements IQualificationLevelsRepository {
    private repository: Repository<QualificationLevel>

    constructor() {
        this.repository = getRepository(QualificationLevel);
    }

    async findByQualificationName(level: string): Promise<QualificationLevel> {
        const qualificationLevel = await this.repository.findOne({level});
        return qualificationLevel;
    }

    async create({id, level}: ICreateQualificationLevel): Promise<QualificationLevel> {
        const qualificationLevel = this.repository.create({
            id,
            level
        })

        await this.repository.save(qualificationLevel);

        return qualificationLevel;
    }
}

export { QualificationLevelsRepository };