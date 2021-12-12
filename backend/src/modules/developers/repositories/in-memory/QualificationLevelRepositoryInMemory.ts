import { IPagination } from "../../../../shared/dtos/IPagination";
import { IQualificationLevel } from "../../dtos/IQualificationLevel";
import { QualificationLevel } from "../../infra/typeorm/entities/QualificationLevel";
import { IQualificationLevelsRepository } from "../IQualificationLevelsRepository";

class QualificationLevelRepositoryInMemory implements IQualificationLevelsRepository {

    qualificationLevels: QualificationLevel[] = [];

    async findById(id: number): Promise<QualificationLevel> {
        const qualificationLevel = this.qualificationLevels.find(qualification => qualification.id === id);
        return qualificationLevel;
    }

    async findByQualificationName(level: string): Promise<QualificationLevel> {
        const qualificationLevel = this.qualificationLevels.find(qualification => qualification.level === level);
        return qualificationLevel;
    }

    async create(data: IQualificationLevel): Promise<QualificationLevel> {
        const index = this.qualificationLevels.length + 1;
        const qualification = new QualificationLevel();
        Object.assign(qualification, { id: index,  level: data.level});
        this.qualificationLevels.push(qualification);
        return qualification;
    }

    async getAll(): Promise<IPagination<QualificationLevel>> {
        const qualificationLevels = this.qualificationLevels;
        return {data: qualificationLevels, total: qualificationLevels.length };
    }

    async delete(id: number): Promise<void> {
        const index = this.qualificationLevels.findIndex(qualification => qualification.id === id);
        this.qualificationLevels.splice(index, 1);
    }

    async update(data: IQualificationLevel): Promise<QualificationLevel> {
        const index = this.qualificationLevels.findIndex(qualification => qualification.id === data.id);
        this.qualificationLevels[index].level = data.level;
        const editedQualification = this.qualificationLevels.find(qualification => qualification.id === data.id);
        return editedQualification;
    }

}

export { QualificationLevelRepositoryInMemory };