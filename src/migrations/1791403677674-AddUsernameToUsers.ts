import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameToUsers1791403677674 implements MigrationInterface {
    name = 'AddUsernameToUsers1791403677674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
