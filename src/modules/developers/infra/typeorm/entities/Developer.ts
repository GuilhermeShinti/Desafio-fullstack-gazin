import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QualificationLevel } from "./QualificationLevel";

@Entity("developers")
class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    qualificationLevelId: number;

    @ManyToOne(() => QualificationLevel, user => user.developers)
    @JoinColumn({ name: "qualificationLevelId" })
    qualificationLevel: QualificationLevel;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    birthdate: Date;

    age: number;

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    getAge = async () => {
        const now = new Date();
        const birth = new Date(this.birthdate);
        var diff = now.getTime() - birth.getTime();
        this.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    @Column()
    hobby: string;
}



export { Developer }