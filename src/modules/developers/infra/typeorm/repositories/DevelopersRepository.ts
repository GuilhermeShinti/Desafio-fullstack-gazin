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
    
    async create({id, name, gender, birthdate, hobby, qualificationLevelId}: IDeveloper): Promise<Developer> {
        const developer = this.repository.create({
            id,
            qualificationLevelId,
            name,
            gender,
            birthdate, 
            hobby
        })

        await this.repository.save(developer);

        return developer;
    }
}

export { DevelopersRepository };