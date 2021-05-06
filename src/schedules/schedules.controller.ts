// core
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// services
import { SchedulesService } from './schedules.service';

// schemas
import { Schedule, ScheduleStatus } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';

// pipes
import { ScheduleStatusValidationPipe } from './pipes/schedule-status-validation.pipe';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getSchedules(
    @Query(ValidationPipe) filterDto: GetSchedulesFilterDto,
  ): Schedule[] {
    if (Object.keys(filterDto).length) {
      return this.schedulesService.getSchedulesWithFilters(filterDto);
    }
    return this.schedulesService.getAllSchedules();
  }

  @Get('/:id')
  getScheduleById(@Param('id') id: string): Schedule {
    return this.schedulesService.getScheduleById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
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
    @Body('status', ScheduleStatusValidationPipe) status: ScheduleStatus,
  ): Schedule {
    return this.schedulesService.updateScheduleStatus(id, status);
  }
}
