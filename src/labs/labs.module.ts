import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LabRepository } from './lab.repository';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';

@Module({
  imports: [TypeOrmModule.forFeature([LabRepository]), AuthModule],
  controllers: [LabsController],
  providers: [LabsService],
})
export class LabsModule {}
