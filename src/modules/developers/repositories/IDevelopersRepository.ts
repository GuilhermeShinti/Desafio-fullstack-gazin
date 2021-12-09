import { IDeveloper } from "../dtos/IDeveloper";
import { Developer } from "../infra/typeorm/entities/Developer";

interface IDevelopersRepository {
    create(data: IDeveloper): Promise<Developer>;
}

export { IDevelopersRepository };