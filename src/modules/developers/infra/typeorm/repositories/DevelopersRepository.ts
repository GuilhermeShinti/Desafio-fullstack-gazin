import { getRepository, Repository } from "typeorm";
import { IDeveloper } from "../../../dtos/IDeveloper";
import { IQualificationLevel } from "../../../dtos/IQualificationLevel";
import { IDevelopersRepository } from "../../../repositories/IDevelopersRepository";
import { Developer } from "../entities/Developer";

class DevelopersRepository implements IDevelopersRepository {
    private repository: Repository<Developer>;

    constructor() {
        this.repository = getRepository(Developer);
    }

    async findByQualificationLevelId(id: number): Promise<Developer[]> {
        const developers = await this.repository.find({id});
        return developers;
    }

    async getAll(): Promise<Developer[]> {
        const developers = await this.repository.find();
        return developers;
    }
    
    async create({id, name, gender, birthdate, hobby, qualificationLevel }: IDeveloper): Promise<Developer> {
        const developer = await this.repository.create({
            id,
            qualificationLevel: qualificationLevel,
            name,
            gender,
            birthdate, 
            hobby
        });

        await this.repository.save(developer);

        return developer;
    }
}

export { DevelopersRepository };