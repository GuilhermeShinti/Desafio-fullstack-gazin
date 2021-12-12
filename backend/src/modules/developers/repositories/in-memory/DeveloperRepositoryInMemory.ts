import { IDeveloper } from "../../dtos/IDeveloper";
import { Developer } from "../../infra/typeorm/entities/Developer";
import { IDevelopersRepository } from "../IDevelopersRepository";

class DeveloperRepositoryInMemory implements IDevelopersRepository {
    developers: Developer[] = [];

    async create(data: IDeveloper): Promise<Developer> {
        const index = this.developers.length + 1;
        const developer = new Developer();

        Object.assign(developer, { 
            id: index,
            qualificationLevelId: data.qualificationLevelId,
            name: data.name,
            gender: data.gender,
            birthdate: data.birthdate,
            hobby: data.hobby
        });
        
        this.developers.push(developer);
        return developer;
    }

    getAll(): Promise<Developer[]> {
        throw new Error("Method not implemented.");
    }

    async findByQualificationLevelId(id: number): Promise<Developer[]> {
        const developers = this.developers.filter(developer => developer.qualificationLevelId === id);
        return developers;
    }

    findById(id: number): Promise<Developer> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(data: IDeveloper): Promise<Developer> {
        throw new Error("Method not implemented.");
    }
}

export { DeveloperRepositoryInMemory };