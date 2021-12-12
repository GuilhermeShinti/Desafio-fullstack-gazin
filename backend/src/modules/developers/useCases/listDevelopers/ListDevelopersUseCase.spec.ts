import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { IQualificationLevel } from "../../dtos/IQualificationLevel";
import { DeveloperRepositoryInMemory } from "../../repositories/in-memory/DeveloperRepositoryInMemory";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloper/CreateDeveloperUsecase";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { ListDevelopersUseCase } from "./ListDevelopersUseCase";

let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;
let developerRepositoryInMemory: DeveloperRepositoryInMemory;
let listDevelopersUseCase: ListDevelopersUseCase;
let createQualificationLevelsUseCase: CreateQualificationLevelUseCase;
let createDeveloperUseCase: CreateDeveloperUseCase;

describe("List Qualification levels", () => {
    beforeEach(() => {
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        developerRepositoryInMemory = new DeveloperRepositoryInMemory();
        createQualificationLevelsUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        createDeveloperUseCase = new  CreateDeveloperUseCase(developerRepositoryInMemory, qualificationLevelRepositoryInMemory);
        listDevelopersUseCase = new ListDevelopersUseCase(developerRepositoryInMemory);
    })

    it("should be able to list all created qualification levels", async () => {
        const newQualification: IQualificationLevel = {
            id: 0,
            level: "Novo Nível"
        }

        await createQualificationLevelsUseCase.execute(newQualification);

        for (let index = 0; index < 10; index++) { 
            const newDeveloper: ICreateDeveloper = {
                id: 0,
                name: `Novo Desenvolvedor ${index + 1}`,
                qualificationLevelId: 1,
                birthdate: new Date("1994-02-25T00:00:00"),
                gender: "M",
                hobby: "play games"
            }

            await createDeveloperUseCase.execute(newDeveloper);
        }

        const developers = await listDevelopersUseCase.execute();

        expect(developers.total).toBe(10);
    });
})