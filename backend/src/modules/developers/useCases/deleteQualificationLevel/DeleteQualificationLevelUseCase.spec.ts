import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { DeveloperRepositoryInMemory } from "../../repositories/in-memory/DeveloperRepositoryInMemory";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory"
import { CreateDeveloperUseCase } from "../createDeveloper/CreateDeveloperUsecase";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { ListQualificationLevelsUseCase } from "../listQualificationLevels/ListQualificationLevelsUseCase";
import { DeleteQualificationLevelUseCase } from "./DeleteQualificationLevelUseCase";

let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;
let developerRepositoryInMemory: DeveloperRepositoryInMemory;
let createDeveloperUseCase: CreateDeveloperUseCase;
let createQualificationLevelUseCase: CreateQualificationLevelUseCase;
let listQualificationLevelUseCase: ListQualificationLevelsUseCase;
let deleteQualificationLevelUseCase: DeleteQualificationLevelUseCase;

describe("Delete Qualification level", () => {

    beforeEach(() => {
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        developerRepositoryInMemory = new DeveloperRepositoryInMemory();
        createDeveloperUseCase = new CreateDeveloperUseCase(developerRepositoryInMemory, qualificationLevelRepositoryInMemory);
        createQualificationLevelUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        listQualificationLevelUseCase = new ListQualificationLevelsUseCase(qualificationLevelRepositoryInMemory);
        deleteQualificationLevelUseCase = new DeleteQualificationLevelUseCase(qualificationLevelRepositoryInMemory, developerRepositoryInMemory);
    })

    it("should be able to delete qualification level", async () => {
        const newQualification = {
            id: 0,
            level: "Novo Nível"
        }

        const createdQualification = await createQualificationLevelUseCase.execute(newQualification);

        await deleteQualificationLevelUseCase.execute(createdQualification.id);

        const qualificationlevels = await listQualificationLevelUseCase.execute();

        expect(qualificationlevels.length).toBe(0);
    })

    it("should not be able to delete qualification level when developers is associated", async () => {
        expect(async () => {
            const newQualification = {
                id: 0,
                level: "Novo Nível"
            }
    
            const newDevelopers: ICreateDeveloper = {
                id: 0,
                name: "Novo Desenvolvedor",
                qualificationLevelId: 1,
                birthdate: new Date("1994-02-25T00:00:00"),
                gender: "M",
                hobby: "play games"
            }
    
            const createdQualification = await createQualificationLevelUseCase.execute(newQualification);
            
            await createDeveloperUseCase.execute(newDevelopers);
            await deleteQualificationLevelUseCase.execute(createdQualification.id);
        }).rejects.toBeInstanceOf(AppError);
    })
})