// core
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// services
import { SchedulesService } from './schedules.service';

// schemas
import { Schedule, ScheduleStatus } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getAllSchedules(): Schedule[] {
    return this.schedulesService.getAllSchedules();
  }

  @Get('/:id')
  getScheduleById(@Param('id') id: string): Schedule {
    return this.schedulesService.getScheduleById(id);
  }

  @Post()
  createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.createSchedule(createScheduleDto);
  }

  @Delete('/:id')
  deleteSchedule(@Param('id') id: string): void {
    return this.schedulesService.deleteSchedule(id);
  }

  @Patch('/:id/status')
  updateScheduleStatus(
    @Param('id') id: string,
    @Body('status') status: ScheduleStatus,
  ): Schedule {
    return this.schedulesService.updateScheduleStatus(id, status);
  }
}
