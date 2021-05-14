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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// services
import { SchedulesService } from './schedules.service';

// schemas
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { User } from '../auth/user.entity';
import { Schedule } from './schedule.entity';
import { ScheduleStatus } from './schedule-status.enums';

// pipes
import { ScheduleStatusValidationPipe } from './pipes/schedule-status-validation.pipe';

// decorators
import { GetUser } from '../auth/get-user.decorator';

@ApiTags('Schedules')
@Controller('schedules')
@UseGuards(AuthGuard())
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getSchedules(
    @Query(ValidationPipe) filterDto: GetSchedulesFilterDto,
    @GetUser() user: User,
  ): Promise<Schedule[]> {
    return this.schedulesService.getSchedules(filterDto, user);
  }

  @Get('/:id')
  getScheduleById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Schedule> {
    return this.schedulesService.getScheduleById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSchedule(
    @Body() createScheduleDto: CreateScheduleDto,
    @GetUser() user: User,
  ): Promise<Schedule> {
    return this.schedulesService.createSchedule(createScheduleDto, user);
  }

  @Delete('/:id')
  deleteSchedule(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.schedulesService.deleteSchedule(id, user);
  }

  @Patch('/:id/status')
  updateScheduleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ScheduleStatusValidationPipe) status: ScheduleStatus,
    @GetUser() user: User,
  ): Promise<Schedule> {
    return this.schedulesService.updateScheduleStatus(id, status, user);
  }
}
