import { getRepository, Repository } from "typeorm";

import { QualificationLevel } from "../entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../../../repositories/IQualificationLevelsRepository";
import { IQualificationLevel } from "../../../dtos/IQualificationLevel";

import { IPagination } from "../../../../../shared/dtos/IPagination";
import { IFilter } from "../../../../../shared/dtos/IFilter";

class QualificationLevelsRepository implements IQualificationLevelsRepository {
    private repository: Repository<QualificationLevel>

    constructor() {
        this.repository = getRepository(QualificationLevel);
    }

    async update({id, level}: IQualificationLevel): Promise<QualificationLevel> {
        const qualificationLevel = await this.repository.save({id, level});

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

    async getAll(filter?: IFilter): Promise<IPagination<QualificationLevel>> {
        const take = filter.limit || 10;
        const skip = ((filter.page - 1) * filter.limit) || 0;
        // const keyword = query.keyword || '';

        const [qualificationlevels, total] = await this.repository.createQueryBuilder('qualificationLevels')
            .leftJoin('qualificationLevels.developers', 'developers')
            .loadRelationCountAndMap('qualificationLevels.totalDevelopers', 'qualificationLevels.developers')
            .skip(skip)
            .take(take)
            .getManyAndCount();

        return {  data: qualificationlevels, total };
    }
}

export { QualificationLevelsRepository };