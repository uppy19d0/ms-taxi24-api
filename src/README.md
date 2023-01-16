#Author Luis A. Tavarez
! Date : 12/01/2023
Link github:https://github.com/uppy19d0

#Code challenger
# Technology
. Typescript
. Nodejs
. Nestjs
. TypeORM
. Postgresql

# step to run api
  

1. Installation Packages

```bash
$ npm install
```

2. Create database (Postgresql)  and confirm that it has been created


![imagen](https://user-images.githubusercontent.com/51054204/212464846-2c5d0144-ee31-46d8-8a15-a5d00879f71a.png)


3.In the src/app.module.ts in the TypeOrmModule module place the configuration of your postgresql server for the application to connect to the database.

https://github.com/uppy19d0/ms-taxi24-api/blob/ccdefed34b696a5031513337acb256581288f4eb/app.module.ts#L16-L26

    TypeOrmModule.forRoot({
    ssl: false,
    type: 'postgres',
    host: 'localhost',
    database: 'taxi24_db',
    username: 'postgres',
    password: '{PASSWORD}',
    port: 5432,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
  })



4. Run migrations and data

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

