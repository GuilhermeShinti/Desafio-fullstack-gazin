import { inject, injectable } from "tsyringe";
import { IFilter } from "../../../../shared/dtos/IFilter";
import { IPagination } from "../../../../shared/dtos/IPagination";
import { Developer } from "../../infra/typeorm/entities/Developer";
import { IDevelopersRepository } from "../../repositories/IDevelopersRepository";

@injectable()
class ListDevelopersUseCase {
    constructor(
        @inject("DevelopersRepository")
        private developersRepository: IDevelopersRepository
    ){}

    async execute(filter?: IFilter): Promise<IPagination<Developer>> {
        const developers = await this.developersRepository.getAll(filter);
        return developers;
    }
}

export { ListDevelopersUseCase };