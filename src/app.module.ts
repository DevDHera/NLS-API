import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { typeOrmConfig } from './config/typeorm.config';
import { smtpMailerConfig } from './config/smtp.config';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LabsModule } from './labs/labs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot(smtpMailerConfig),
    SchedulesModule,
    AuthModule,
    NotificationsModule,
    LabsModule,
  ],
})
export class AppModule {}
