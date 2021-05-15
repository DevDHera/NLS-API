import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SchedulesModule,
    AuthModule,
    NotificationsModule,
  ],
})
export class AppModule {}
