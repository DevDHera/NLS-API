import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SchedulesModule],
})
export class AppModule {}
