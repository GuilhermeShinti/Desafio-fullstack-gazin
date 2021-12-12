import { QualificationLevelRepositoryInMemory } from "../../repositories/in-memory/QualificationLevelRepositoryInMemory";
import { CreateQualificationLevelUseCase } from "../createQualificationLevel/CreateQualificationLevelUseCase";
import { ListQualificationLevelsUseCase } from "./ListQualificationLevelsUseCase"

let qualificationLevelRepositoryInMemory: QualificationLevelRepositoryInMemory;
let listQualificationLevelsUseCase: ListQualificationLevelsUseCase;
let createQualificationLevelsUseCase: CreateQualificationLevelUseCase;

describe("List Qualification levels", () => {
    beforeEach(() => {
        qualificationLevelRepositoryInMemory = new QualificationLevelRepositoryInMemory();
        createQualificationLevelsUseCase = new CreateQualificationLevelUseCase(qualificationLevelRepositoryInMemory);
        listQualificationLevelsUseCase = new ListQualificationLevelsUseCase(qualificationLevelRepositoryInMemory);
    })

    it("should be able to list all created qualification levels", async () => {
        for (let index = 0; index < 10; index++) {
            let newQualification = {
                id: 0,
                level: `Novo Nível ${index + 1}`
            }

            await createQualificationLevelsUseCase.execute(newQualification);
            
        }

        const qualificationLevels = await listQualificationLevelsUseCase.execute();

        expect(qualificationLevels.length).toBe(10);
    })
})