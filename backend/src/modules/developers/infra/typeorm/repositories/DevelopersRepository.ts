import { getRepository, Repository } from "typeorm";
import { IFilter } from "../../../../../shared/dtos/IFilter";
import { IPagination } from "../../../../../shared/dtos/IPagination";
import { IDeveloper } from "../../../dtos/IDeveloper";
import { IDevelopersRepository } from "../../../repositories/IDevelopersRepository";
import { Developer } from "../entities/Developer";

class DevelopersRepository implements IDevelopersRepository {
    private repository: Repository<Developer>;

    constructor() {
        this.repository = getRepository(Developer);
    }

    async update({id, name, gender, birthdate, hobby, qualificationLevelId, qualificationLevel}: IDeveloper): Promise<Developer> {
        const developer = await this.repository.save({id, name, gender, birthdate, hobby, qualificationLevelId, qualificationLevel});
        return developer;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({id});
    }

    async findById(id: number): Promise<Developer> {
        const developer = await this.repository.findOne(id);
        return developer;
    }

    async findByQualificationLevelId(id: number): Promise<Developer[]> {
        const developers = await this.repository.find({
            where: { qualificationLevelId: id}
        });
        return developers;
    }

    async getAll(filter?: IFilter): Promise<IPagination<Developer>> {
        const take = filter.limit || 10
        const skip = ((filter.page - 1) * filter.limit) || 0

        const [developers, total] = await this.repository.createQueryBuilder('developers')
            .leftJoinAndSelect('developers.qualificationLevel', 'qualificationLevels')
            .skip(skip)
            .take(take)
            .getManyAndCount();

        return { data: developers, total };
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