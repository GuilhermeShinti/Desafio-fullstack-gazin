import { IDeveloper } from "../dtos/IDeveloper";
import { Developer } from "../infra/typeorm/entities/Developer";

interface IDevelopersRepository {
    create(data: IDeveloper): Promise<Developer>;
    getAll(): Promise<Developer[]>;
    findByQualificationLevelId(id: number): Promise<Developer[]>;
    findById(id: number): Promise<Developer>;
    delete(id: number): Promise<void>;
}

export { IDevelopersRepository };