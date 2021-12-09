import { container } from "tsyringe";
import { DevelopersRepository } from "../../modules/developers/infra/typeorm/repositories/DevelopersRepository";
import { QualificationLevelsRepository } from "../../modules/developers/infra/typeorm/repositories/QualificationLevelsRepository";
import { IDevelopersRepository } from "../../modules/developers/repositories/IDevelopersRepository";
import { IQualificationLevelsRepository } from "../../modules/developers/repositories/IQualificationLevelsRepository";

container.registerSingleton<IQualificationLevelsRepository>("QualificationLevelsRepository", QualificationLevelsRepository);
container.registerSingleton<IDevelopersRepository>("DevelopersRepository", DevelopersRepository);