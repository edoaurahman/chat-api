import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'edoaurahman',
  password: 'edo24123',
  database: 'chat',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
};
