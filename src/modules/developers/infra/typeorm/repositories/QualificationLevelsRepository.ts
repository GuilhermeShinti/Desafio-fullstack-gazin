import { getRepository, Repository } from "typeorm";

import { QualificationLevel } from "../entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../../repositories/IQualificationLevelsRepository";
import { IQualificationLevel } from "../../../dtos/IQualificationLevel";

class QualificationLevelsRepository implements IQualificationLevelsRepository {
    private repository: Repository<QualificationLevel>

    constructor() {
        this.repository = getRepository(QualificationLevel);
    }

    async update({id, level}: IQualificationLevel): Promise<QualificationLevel> {
        await this.repository.save({id, level});

        const qualificationLevel = await this.repository.findOne(id);

        return qualificationLevel;
    }

    async create({id, level}: IQualificationLevel): Promise<QualificationLevel> {
        const qualificationLevel = this.repository.create({
            id,
            level
        })

        await this.repository.save(qualificationLevel);

        return qualificationLevel;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findById(id: number): Promise<QualificationLevel> {
        const qualificationLevel = await this.repository.findOne(id);
        return qualificationLevel;
    }

    async findByQualificationName(level: string): Promise<QualificationLevel> {
        const qualificationLevel = await this.repository.findOne({level});
        return qualificationLevel;
    }

    async list(): Promise<QualificationLevel[]> {
        const qualificationlevels = await this.repository.find();
        return qualificationlevels;
    }
}

export { QualificationLevelsRepository };