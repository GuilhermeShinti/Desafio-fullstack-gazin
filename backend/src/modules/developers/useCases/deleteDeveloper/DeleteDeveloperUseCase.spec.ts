import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { IQualificationLevel } from "../../dtos/IQualificationLevel";
import { DeveloperRepositoryInMemory } from "../../repositories/in-memory/DeveloperRepositoryInMemory";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloper/CreateDeveloperUsecase";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { ListDevelopersUseCase } from "../listDevelopers/ListDevelopersUseCase";
import { DeleteDeveloperUseCase } from "./DeleteDeveloperUseCase";

let developerRepositoryInMemory: DeveloperRepositoryInMemory;
let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;

let createDeveloperUseCase: CreateDeveloperUseCase;
let deleteDeveloperUsecase: DeleteDeveloperUseCase;
let listDevelopersUseCase: ListDevelopersUseCase;
let createQualificationLevelUseCase: CreateQualificationLevelUseCase;

describe("Delete Developer", () => {
    beforeEach(() => {
        developerRepositoryInMemory = new DeveloperRepositoryInMemory();
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        createQualificationLevelUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        createDeveloperUseCase = new CreateDeveloperUseCase(developerRepositoryInMemory, qualificationLevelRepositoryInMemory);
        deleteDeveloperUsecase = new DeleteDeveloperUseCase(developerRepositoryInMemory);
        listDevelopersUseCase = new ListDevelopersUseCase(developerRepositoryInMemory);
    })

    it("should be able to delete a developer", async () => {
        const newQualification: IQualificationLevel = {
            id: 0,
            level: "Novo Nível"
        }

        const newDeveloper: ICreateDeveloper = {
            id: 0,
            name: "Developer",
            qualificationLevelId: 1,
            birthdate: new Date("1994-02-25T00:00:00"),
            gender: "M",
            hobby: "play games"
        }

        await createQualificationLevelUseCase.execute(newQualification);

        const createdDeveloper = await createDeveloperUseCase.execute(newDeveloper);

        await deleteDeveloperUsecase.execute(createdDeveloper.id);

        const developers = await listDevelopersUseCase.execute();

        expect(developers.total).toBe(0);
    });
})