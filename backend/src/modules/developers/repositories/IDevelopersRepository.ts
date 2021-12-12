import { IFilter } from "../../../shared/dtos/IFilter";
import { IPagination } from "../../../shared/dtos/IPagination";
import { IDeveloper } from "../dtos/IDeveloper";
import { Developer } from "../infra/typeorm/entities/Developer";

interface IDevelopersRepository {
    create(data: IDeveloper): Promise<Developer>;
    getAll(filter: IFilter): Promise<IPagination<Developer>>;
    findByQualificationLevelId(id: number): Promise<Developer[]>;
    findById(id: number): Promise<Developer>;
    delete(id: number): Promise<void>;
    update(data: IDeveloper): Promise<Developer>;
}

export { IDevelopersRepository };