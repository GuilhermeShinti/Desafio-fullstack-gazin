import { ICreateQualificationLevel } from "../dtos/ICreateQualificationLevel";
import { QualificationLevel } from "../infra/typeorm/entities/QualificationLevel";

interface IQualificationLevelsRepository {
    findById(id: number): Promise<QualificationLevel>;
    findByQualificationName(nivel: string) : Promise<QualificationLevel>;
    create(data: ICreateQualificationLevel) : Promise<QualificationLevel>;
    list(): Promise<QualificationLevel[]>;
    delete(id: number): Promise<void>;
}

export { IQualificationLevelsRepository };