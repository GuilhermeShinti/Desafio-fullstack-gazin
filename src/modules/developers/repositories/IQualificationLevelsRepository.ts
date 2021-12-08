import { ICreateQualificationLevel } from "../dtos/ICreateQualificationLevel";
import { QualificationLevel } from "../infra/typeorm/entities/QualificationLevel";

interface IQualificationLevelsRepository {
    findByQualificationName(nivel: string) : Promise<QualificationLevel>;
    create(data: ICreateQualificationLevel) : Promise<QualificationLevel>;
}

export { IQualificationLevelsRepository };