// core
import { Body, Controller, Get, Post } from '@nestjs/common';

// services
import { SchedulesService } from './schedules.service';

// schemas
import { Schedule } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getAllSchedules(): Schedule[] {
    return this.schedulesService.getAllSchedules();
  }

  @Post()
  createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.createSchedule(createScheduleDto);
  }
}
