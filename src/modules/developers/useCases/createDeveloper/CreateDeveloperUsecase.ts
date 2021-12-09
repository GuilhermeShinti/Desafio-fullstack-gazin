import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDeveloper } from "../../dtos/IDeveloper";
import { Developer } from "../../infra/typeorm/entities/Developer";
import { DevelopersRepository } from "../../infra/typeorm/repositories/DevelopersRepository";
import { QualificationLevelsRepository } from "../../infra/typeorm/repositories/QualificationLevelsRepository";

@injectable()
class CreateDeveloperUseCase {
    constructor(
        @inject("DevelopersRepository")
        private developersRepository: DevelopersRepository,
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: QualificationLevelsRepository,
    ) {}

    async execute({id, name, gender, birthdate, hobby, qualificationLevelId}: IDeveloper): Promise<Developer> {
        if (!name) {
            throw new AppError("Informe o nome do Desenvolvedor.")
        }

        if (!birthdate) {
            throw new AppError("Informe a data de nascimento do Desenvolvedor.")
        }

        if (!gender) {
            throw new AppError("Informe o sexo do Desenvolvedor.")
        }

        const qualificationLevel = this.qualificationLevelsRepository.findById(qualificationLevelId);

        if (!qualificationLevel) {
            throw new AppError("Informe o nível do Desenvolvedor.")
        }

        const developer = await this.developersRepository.create({id, name, gender, birthdate, hobby, qualificationLevelId});

        return developer;
    }
}

export { CreateDeveloperUseCase };