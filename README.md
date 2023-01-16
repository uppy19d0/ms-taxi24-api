#Author Luis A. Tavarez
! Date : 12/01/2023
Link github:https://github.com/uppy19d0

# Technology
. Typescript
. Nodejs
. Nestjs
. TypeORM
. Postgresql


# Code challenger
Done 


# step to run api
  

1. Installation Packages

```bash
$ npm install
```

2. Create database (Postgresql)  and confirm that it has been created


![imagen](https://user-images.githubusercontent.com/51054204/212464846-2c5d0144-ee31-46d8-8a15-a5d00879f71a.png)


3.In the database/database-source.ts in the DataSourceOptions place the configuration of your postgresql server for the application to connect to the database.

https://github.com/uppy19d0/ms-taxi24-api/blob/7f5ce24cbfe40927c4b96c242808b3cc93d9f153/database/database-source.ts#L3-L13

export const DatabaseSourceOptions: DataSourceOptions = {
  ssl: false,
  type: 'postgres',
  host: 'localhost',
  database: 'taxi24_db',
  username: 'postgres',
  password: '',
  port: 5432,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
};

4. Run migration to database 

    $ npm run migration:run

5. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

. Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

