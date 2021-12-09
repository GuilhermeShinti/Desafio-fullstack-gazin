import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { EnumGender } from "../../../enums/EnumGender";

export class CreateDevelopersTable1638991561045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "developers",
                    columns: [
                        {
                            name: "id",
                            type: "integer",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment'
                        },
                        {
                            name: "qualificationLevelId",
                            type: "integer"
                        },
                        {
                            name: "name",
                            type: "varchar"
                        },
                        {
                            name: "gender",
                            type: "enum",
                            enum: [EnumGender.Female, EnumGender.Male, EnumGender.Others],
                            isNullable: true
                        },
                        {
                            name: "birthdate",
                            type: "date"
                        },
                        {
                            name: "hobby",
                            type: "varchar"
                        }
                    ]
                }
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Developers");
    }

}
