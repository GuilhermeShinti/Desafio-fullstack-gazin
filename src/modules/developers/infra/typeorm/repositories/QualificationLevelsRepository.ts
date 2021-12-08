import { getRepository, Repository } from "typeorm";

import { QualificationLevel } from "../entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../../repositories/IQualificationLevelsRepository";
import { ICreateQualificationLevel } from "../../../dtos/ICreateQualificationLevel";

class QualificationLevelsRepository implements IQualificationLevelsRepository {
    private repository: Repository<QualificationLevel>

    constructor() {
        this.repository = getRepository(QualificationLevel);
    }

    async create({id, level}: ICreateQualificationLevel): Promise<QualificationLevel> {
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

    findById(id: number): Promise<QualificationLevel> {
        const qualificationLevel = this.repository.findOne(id);
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