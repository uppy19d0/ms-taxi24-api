import { DataSource, DataSourceOptions } from 'typeorm';

export const DatabaseSourceOptions: DataSourceOptions = {
  ssl: false,
  type: 'postgres',
  host: 'localhost',
  database: 'roma',
  username: 'postgres',
  password: 'root',
  port: 5432,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(DatabaseSourceOptions);

export default dataSource;
