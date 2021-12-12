import { AppError } from "../../../../shared/errors/AppError";
import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { EditQualificationLevelUseCase } from "../editQualificationLevel/EditQualificationLevelUseCase";

let createQualificationUseCase: CreateQualificationLevelUseCase;
let editQualificationUseCase: EditQualificationLevelUseCase;
let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;

describe("Edit Qualification level", () => {

    beforeEach(() => {
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        createQualificationUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        editQualificationUseCase = new EditQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
    });

    it("should be able to edit qualification level", async () => {
        const newQualification = {
            id: 0,
            level: "Novo Nível"
        }

        const createdQualification = await createQualificationUseCase.execute(newQualification);

        createdQualification.id = 0;
        createdQualification.level = "Nível editado";

        const editedQualification = await editQualificationUseCase.execute(newQualification);

        expect(editedQualification.level).toBe(createdQualification.level);
    });

    it("should not be able to edit qualification level when id doesn't exists", async () => {
        expect(async () => {
            const newQualification = {
                id: 0,
                level: "Novo Nível"
            }
    
            await createQualificationUseCase.execute(newQualification);
    
            await editQualificationUseCase.execute(newQualification);
        }).rejects.toBeInstanceOf(AppError)
    });
})