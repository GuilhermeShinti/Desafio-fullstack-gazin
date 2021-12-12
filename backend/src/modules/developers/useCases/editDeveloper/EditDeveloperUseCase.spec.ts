import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { IQualificationLevel } from "../../dtos/IQualificationLevel";
import { DeveloperRepositoryInMemory } from "../../repositories/in-memory/DeveloperRepositoryInMemory";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateDeveloperUseCase } from "../createDeveloper/CreateDeveloperUsecase";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { EditDeveloperUseCase } from "./EditDeveloperUseCase";


let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;
let developerRepositoryInMemory: DeveloperRepositoryInMemory;

let createQualificationLevelsUseCase: CreateQualificationLevelUseCase;
let createDeveloperUseCase: CreateDeveloperUseCase;
let editDeveloperUseCase: EditDeveloperUseCase;

describe("Edit Developer", () => {
    beforeEach(() => {
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        developerRepositoryInMemory = new DeveloperRepositoryInMemory();
        createQualificationLevelsUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        editDeveloperUseCase = new EditDeveloperUseCase(developerRepositoryInMemory, qualificationLevelRepositoryInMemory);
        createDeveloperUseCase = new  CreateDeveloperUseCase(developerRepositoryInMemory, qualificationLevelRepositoryInMemory);

    })

    it("should be able to edit a developer", async () => {
        const newQualification1: IQualificationLevel = {
            id: 0,
            level: "Novo Nível 1"
        }

        const newQualification2: IQualificationLevel = {
            id: 0,
            level: "Novo Nível 2"
        }

        await createQualificationLevelsUseCase.execute(newQualification1);
        await createQualificationLevelsUseCase.execute(newQualification2);

        const newDeveloper: ICreateDeveloper = {
            id: 0,
            name: 'Novo Desenvolvedor',
            qualificationLevelId: 1,
            birthdate: new Date("1994-02-25T00:00:00"),
            gender: "M",
            hobby: "play games"
        }

        const createdDeveloper = await createDeveloperUseCase.execute(newDeveloper);

        createdDeveloper.name =  'Novo Desenvolvedor';
        createdDeveloper.qualificationLevelId = 2;
        createdDeveloper.birthdate = new Date("1990-05-20T00:00:00");
        createdDeveloper.gender =  'O';
        createdDeveloper.hobby =  'Escutar músicas';

        const editedDeveloper = editDeveloperUseCase.execute(createdDeveloper);
        delete editedDeveloper["id"];
        delete newDeveloper["id"];
        

        expect(newDeveloper).not.toEqual(editedDeveloper);
    });

    it("should not be able to edit developer when id doesn't exists", async () => {
        expect(async () => {
            const newQualification = {
                id: 0,
                level: "Novo Nível"
            }
    
            await createQualificationLevelsUseCase.execute(newQualification);

            const newDeveloper: ICreateDeveloper = {
                id: 0,
                name: 'Novo Desenvolvedor',
                qualificationLevelId: 1,
                birthdate: new Date("1994-02-25T00:00:00"),
                gender: "M",
                hobby: "play games"
            }
    
            await createDeveloperUseCase.execute(newDeveloper);
            await editDeveloperUseCase.execute(newDeveloper);
        }).rejects.toBeInstanceOf(AppError)
    });
})