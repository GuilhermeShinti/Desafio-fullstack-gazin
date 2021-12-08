import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qualificationLevels")
class QualificationLevel {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    level: string;
}

export { QualificationLevel };