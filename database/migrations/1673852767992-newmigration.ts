import { MigrationInterface, QueryRunner } from 'typeorm';

export class newmigration1673852767992 implements MigrationInterface {
  name = 'newmigration1673852767992';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trip" ("id" SERIAL NOT NULL, "departure" character varying(150) NOT NULL, "destination" text NOT NULL, "is_complete" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "passenger_id" integer, CONSTRAINT "PK_714c23d558208081dbccb9d9268" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "phone" text NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "cost" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "driver_id" integer, "passenger_id" integer, "trip_id" integer, CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "driver" ("id" SERIAL NOT NULL, "names" character varying(150) NOT NULL, "phone" text NOT NULL, "email" character varying NOT NULL, "location" character varying NOT NULL, "is_available" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip" ADD CONSTRAINT "FK_f314f86bf8e02aff0cc32b5e271" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip" ADD CONSTRAINT "FK_3d9a53e115529549f9e8d974b52" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_20cf229be5e5d17ed43f2ec6b87" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_5035464daf7dc6aa98a7a919199" FOREIGN KEY ("passenger_id") REFERENCES "passenger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_b86ac4c109848bc8807d91b8afd" FOREIGN KEY ("trip_id") REFERENCES "trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    //insert driver
    await queryRunner.query(
      `INSERT INTO "driver"(names, phone, email, location, is_available) 
                      VALUES
                      ('Luis Tavarez', '23344', 'testdriver@grupobabel.com', '18.485225,-69.865628', true)`,
    );

    await queryRunner.query(
      `INSERT INTO "driver"(names, phone, email, location, is_available) 
                      VALUES
                      ('JUAN test', '23344', 'testdriver2@grupobabel.com', '18.4858728,-69.860116', true)`,
    );

    await queryRunner.query(
      `INSERT INTO "driver"(names, phone, email, location, is_available) 
                      VALUES
                      ('Pedro test', '23344', 'testdriver3@grupobabel.com', '18.4858728,-69.860116', false)`,
    );

    //insert passenger
    await queryRunner.query(
      `INSERT INTO "passenger"(name, phone, email) 
                      VALUES
                      ('Maxxy', '23344', 'testcustomer1@grupobabel.com')`,
    );

    await queryRunner.query(
      `INSERT INTO "passenger"(name, phone, email) 
                      VALUES
                      ('Nicola', '23344', 'testcustomer2@grupobabel.com')`,
    );

    await queryRunner.query(
      `INSERT INTO "passenger"(name, phone, email) 
                      VALUES
                      ('Kimberly', '23344', 'testcustomer3@grupobabel.com')`,
    );

    //insert trip

    //trip complete for generate invoice
    await queryRunner.query(
      `INSERT INTO "trip"(departure, destination , is_complete ,passenger_id,driver_id) 
                VALUES
                ('18.4858728,-69.860116', '18.4934933,-69.8690667', true,1,2)`,
    );

    await queryRunner.query(
      `INSERT INTO "trip"(departure, destination , is_complete ,passenger_id,driver_id) 
                VALUES
                ('18.4858728,-69.860116', '18.4934933,-69.8690667', false,1,2)`,
    );

    await queryRunner.query(
      `INSERT INTO "trip"(departure, destination , is_complete,passenger_id,driver_id) 
                VALUES
                ('18.4858728,-69.860116', '18.4934933,-69.8690667', false,2,1)`,
    );

    //insert invoices
    await queryRunner.query(
      `INSERT INTO "invoice"(passenger_id, driver_id , trip_id ,cost)
                VALUES
                (2, 1, 1,'300')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_b86ac4c109848bc8807d91b8afd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_5035464daf7dc6aa98a7a919199"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_20cf229be5e5d17ed43f2ec6b87"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip" DROP CONSTRAINT "FK_3d9a53e115529549f9e8d974b52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip" DROP CONSTRAINT "FK_f314f86bf8e02aff0cc32b5e271"`,
    );
    await queryRunner.query(`DROP TABLE "driver"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TABLE "passenger"`);
    await queryRunner.query(`DROP TABLE "trip"`);
  }
}
