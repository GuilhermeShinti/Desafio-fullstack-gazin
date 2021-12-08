import { IQualificationLevel } from "../dtos/IQualificationLevel";
import { QualificationLevel } from "../infra/typeorm/entities/QualificationLevel";

interface IQualificationLevelsRepository {
    findById(id: number): Promise<QualificationLevel>;
    findByQualificationName(nivel: string) : Promise<QualificationLevel>;
    create(data: IQualificationLevel) : Promise<QualificationLevel>;
    list(): Promise<QualificationLevel[]>;
    delete(id: number): Promise<void>;
    update(data: IQualificationLevel): Promise<QualificationLevel>;
}

export { IQualificationLevelsRepository };