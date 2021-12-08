import { container } from "tsyringe";
import { QualificationLevelsRepository } from "../../modules/developers/infra/typeorm/repositories/QualificationLevelsRepository";
import { IQualificationLevelsRepository } from "../../modules/developers/repositories/IQualificationLevelsRepository";

container.registerSingleton<IQualificationLevelsRepository>("QualificationLevelsRepository", QualificationLevelsRepository);