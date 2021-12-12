import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDeveloper } from "../../dtos/ICreateDeveloper";
import { IQualificationLevel } from "../../dtos/IQualificationLevel";
import { DeveloperRepositoryInMemory } from "../../repositories/in-memory/DeveloperRepositoryInMemory";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { CreateDeveloperUseCase } from "./CreateDeveloperUsecase"

let developerRepositoryInMemory: DeveloperRepositoryInMemory;
let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;
let createDeveloperUseCase: CreateDeveloperUseCase;
let createQualificationLevelUseCase: CreateQualificationLevelUseCase;

describe("Create Developer", () => {
    beforeEach(() => {
        developerRepositoryInMemory = new DeveloperRepositoryInMemory();
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        createQualificationLevelUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        createDeveloperUseCase = new CreateDeveloperUseCase(developerRepositoryInMemory, qualificationLevelRepositoryInMemory);
    })

    it("should be able to create a developer", async () => {
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

        expect(createdDeveloper.id).not.toBe(newDeveloper.id);
    });

    it("should not be able to create a developer when name is empty", async () => {
        expect(async () => {
            const newQualification: IQualificationLevel = {
                id: 0,
                level: "Novo Nível"
            }
    
            const newDeveloper: ICreateDeveloper = {
                id: 0,
                name: "",
                qualificationLevelId: 1,
                birthdate: new Date("1994-02-25T00:00:00"),
                gender: "M",
                hobby: "play games"
            }
    
            await createQualificationLevelUseCase.execute(newQualification);
            await createDeveloperUseCase.execute(newDeveloper);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a developer when gender is empty", async () => {
        expect(async () => {
            const newQualification: IQualificationLevel = {
                id: 0,
                level: "Novo Nível"
            }
    
            const newDeveloper: ICreateDeveloper = {
                id: 0,
                name: "Developer",
                qualificationLevelId: 1,
                birthdate: new Date("1994-02-25T00:00:00"),
                gender: "",
                hobby: "play games"
            }
    
            await createQualificationLevelUseCase.execute(newQualification);
            await createDeveloperUseCase.execute(newDeveloper);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a developer when qualification level is doesnt exists", async () => {
        expect(async () => {
            const newQualification: IQualificationLevel = {
                id: 0,
                level: "Novo Nível"
            }
    
            const newDeveloper: ICreateDeveloper = {
                id: 0,
                name: "Developer",
                qualificationLevelId: 0,
                birthdate: new Date("1994-02-25T00:00:00"),
                gender: "M",
                hobby: "play games"
            }
    
            await createQualificationLevelUseCase.execute(newQualification);
            await createDeveloperUseCase.execute(newDeveloper);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a developer when birthdate is empty", async () => {
        expect(async () => {
            const newQualification: IQualificationLevel = {
                id: 0,
                level: "Novo Nível"
            }
    
            const newDeveloper: ICreateDeveloper = {
                id: 0,
                name: "Developer",
                qualificationLevelId: 1,
                birthdate: null,
                gender: "M",
                hobby: "play games"
            }
    
            await createQualificationLevelUseCase.execute(newQualification);
            await createDeveloperUseCase.execute(newDeveloper);
        }).rejects.toBeInstanceOf(AppError);
    });
})