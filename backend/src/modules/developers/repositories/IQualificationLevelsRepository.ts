
import { IFilter } from "../../../shared/dtos/IFilter";
import { IPagination } from "../../../shared/dtos/IPagination";
import { IQualificationLevel } from "../dtos/IQualificationLevel";
import { QualificationLevel } from "../infra/typeorm/entities/QualificationLevel";

interface IQualificationLevelsRepository {
    findById(id: number): Promise<QualificationLevel>;
    findByQualificationName(nivel: string) : Promise<QualificationLevel>;
    create(data: IQualificationLevel) : Promise<QualificationLevel>;
    getAll(filter: IFilter): Promise<IPagination<QualificationLevel>>;
    delete(id: number): Promise<void>;
    update(data: IQualificationLevel): Promise<QualificationLevel>;
}

export { IQualificationLevelsRepository };