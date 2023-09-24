import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const ormconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
};
