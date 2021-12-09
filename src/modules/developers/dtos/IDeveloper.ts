import { IQualificationLevel } from "./IQualificationLevel";

interface IDeveloper {
    id: number;
    qualificationLevel: IQualificationLevel;
    name: string;
    gender: string;
    birthdate: Date;
    hobby: string;
}

export { IDeveloper };