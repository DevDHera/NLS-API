import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'YOUR_HOST',
  port: 3306,
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  database: 'YOUR_DB_NAME',
  autoLoadEntities: true,
  synchronize: true,
};
