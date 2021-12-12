import { IFilter } from "../../../../shared/dtos/IFilter";
import { IPagination } from "../../../../shared/dtos/IPagination";
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

    async getAll(filter: IFilter): Promise<IPagination<Developer>> {
        const developers = this.developers;
        return {data: developers, total: developers.length };
    }

    async findByQualificationLevelId(id: number): Promise<Developer[]> {
        const developers = this.developers.filter(developer => developer.qualificationLevelId === id);
        return developers;
    }

    async findById(id: number): Promise<Developer> {
        const developer = this.developers.find(developer => developer.id === id);
        return developer;
    }

    async delete(id: number): Promise<void> {
        const index = this.developers.findIndex(developer => developer.id === id);
        this.developers.splice(index, 1);
    }

    async update(data: IDeveloper): Promise<Developer> {
        const index = this.developers.findIndex(developer => developer.id === data.id);
        this.developers[index].name = data.name;
        this.developers[index].birthdate = data.birthdate;
        this.developers[index].gender = data.gender;
        this.developers[index].hobby = data.hobby;
        this.developers[index].qualificationLevelId = data.qualificationLevelId;
        return this.developers[index];
    }
}

export { DeveloperRepositoryInMemory };