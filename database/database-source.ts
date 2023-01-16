import { DataSource, DataSourceOptions } from 'typeorm';

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

const dataSource = new DataSource(DatabaseSourceOptions);

export default dataSource;
