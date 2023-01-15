import { TypeOrmModule } from '@nestjs/typeorm';

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    ssl: false,
    type: 'postgres',
    host: 'localhost',
    database: 'taxi24_db',
    username: 'postgres',
    password: 'root',
    port: 5432,
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}']
  }),
];
