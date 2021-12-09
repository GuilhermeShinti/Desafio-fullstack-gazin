import { getRepository, Repository } from "typeorm";
import { IDeveloper } from "../../../dtos/IDeveloper";
import { IDevelopersRepository } from "../../../repositories/IDevelopersRepository";
import { Developer } from "../entities/Developer";

class DevelopersRepository implements IDevelopersRepository {
    private repository: Repository<Developer>;

    constructor() {
        this.repository = getRepository(Developer);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({id});
    }

    async findById(id: number): Promise<Developer> {
        const developer = await this.repository.findOne({id});
        return developer;
    }

    async findByQualificationLevelId(id: number): Promise<Developer[]> {
        const developers = await this.repository.find({
            where: { qualificationLevelId: id}
        });
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