// core
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// services
import { SchedulesService } from './schedules.service';

// schemas
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';

// pipes
import { ScheduleStatusValidationPipe } from './pipes/schedule-status-validation.pipe';
import { Schedule } from './schedule.entity';
import { ScheduleStatus } from './schedule-status.enums';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getSchedules(
    @Query(ValidationPipe) filterDto: GetSchedulesFilterDto,
  ): Promise<Schedule[]> {
    return this.schedulesService.getSchedules(filterDto);
  }

  @Get('/:id')
  getScheduleById(@Param('id', ParseIntPipe) id: number): Promise<Schedule> {
    return this.schedulesService.getScheduleById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSchedule(
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.schedulesService.createSchedule(createScheduleDto);
  }

  @Delete('/:id')
  deleteSchedule(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.schedulesService.deleteSchedule(id);
  }

  @Patch('/:id/status')
  updateScheduleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ScheduleStatusValidationPipe) status: ScheduleStatus,
  ): Promise<Schedule> {
    return this.schedulesService.updateScheduleStatus(id, status);
  }
}
