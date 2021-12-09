import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { Developer } from "../../infra/typeorm/entities/Developer";
import { IDevelopersRepository } from "../../repositories/IDevelopersRepository";
import { IQualificationLevelsRepository } from "../../repositories/IQualificationLevelsRepository";

@injectable()
class EditDeveloperUseCase {
    constructor(
        @inject("DevelopersRepository")
        private developerRepository: IDevelopersRepository,
        @inject("QualificationLevelsRepository")
        private qualificationLevelsRepository: IQualificationLevelsRepository
    ) {}

    async execute({id, name, gender, birthdate, hobby, qualificationLevelId}: ICreateDeveloper): Promise<Developer> {
        const developer = await this.developerRepository.findById(id);
        if (!developer) {
            throw new AppError("O desenvolvedor informado não existe.");
        }

        const qualificationLevel = await this.qualificationLevelsRepository.findById(qualificationLevelId);
        if (!qualificationLevel) {
            throw new AppError("Informe o nível do Desenvolvedor.")
        }

        developer.name = name;
        developer.birthdate = birthdate;
        developer.gender = gender;
        developer.hobby = hobby;
        developer.qualificationLevelId = qualificationLevelId;
        developer.qualificationLevel = qualificationLevel;

        const updatedDeveloper = await this.developerRepository.update(developer);
        
        return updatedDeveloper;
    }
}

export { EditDeveloperUseCase }