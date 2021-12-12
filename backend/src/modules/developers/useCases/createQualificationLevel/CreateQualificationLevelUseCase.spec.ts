import { AppError } from "../../../../shared/errors/AppError";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateQualificationLevelUseCase } from "./CreateQualificationLevelUseCase";

let createQualificationUseCase: CreateQualificationLevelUseCase;
let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;

describe("Create Qualification Level", () => {

    beforeEach(() => {
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        createQualificationUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
    })

    it("should be able to create a new qualification level", async () => {
        const newQualification = {
            id: 0,
            level: "Novo nível"
        }

        const createdQualification = await createQualificationUseCase.execute(newQualification);

        expect(createdQualification.id).not.toBe(newQualification.id);
    })

    it("should not be able to create a new qualification without level", async () => {
        expect(async () => {
            const newQualification = {
                id: 0,
                level: ""
            }
    
            await createQualificationUseCase.execute(newQualification);
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to create a new qualification level with same name", async () => {
        expect(async () => {
            const newQualification = {
                id: 0,
                level: "Novo nível"
            }

            await createQualificationUseCase.execute(newQualification);
            await createQualificationUseCase.execute(newQualification);
        }).rejects.toBeInstanceOf(AppError);
    })
})