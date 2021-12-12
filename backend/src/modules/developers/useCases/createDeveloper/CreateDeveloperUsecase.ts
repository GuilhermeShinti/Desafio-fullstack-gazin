import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { Developer } from "../../infra/typeorm/entities/Developer";
import { IDevelopersRepository } from "../../repositories/IDevelopersRepository";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";

@injectable()
class CreateDeveloperUseCase {
    constructor(
        @inject("DevelopersRepository")
        private developersRepository: IDevelopersRepository,
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: IQualificationLevelsRepository,
    ) {}

    async execute({id, name, gender, birthdate, hobby, qualificationLevelId}: ICreateDeveloper): Promise<Developer> {
        if (!name) {
            throw new AppError("Informe o nome do Desenvolvedor.")
        }

        if (!birthdate) {
            throw new AppError("Informe a data de nascimento do Desenvolvedor.")
        }

        if (!gender) {
            throw new AppError("Informe o sexo do Desenvolvedor.")
        }

        const qualificationLevel = await this.qualificationLevelsRepository.findById(qualificationLevelId);

        if (!qualificationLevel) {
            throw new AppError("Informe o nível do Desenvolvedor.")
        }

        const developer = await this.developersRepository.create({id, name, gender, birthdate, hobby, qualificationLevel, qualificationLevelId });

        return developer;
    }
}

export { CreateDeveloperUseCase };