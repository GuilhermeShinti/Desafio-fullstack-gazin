import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Developer } from "./Developer";

@Entity("qualificationLevels")
class QualificationLevel {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    level: string;

    @OneToMany(() => Developer, developer => developer.qualificationLevel)
    developers: Developer[]
}

export { QualificationLevel };