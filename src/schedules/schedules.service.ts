// core
import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

// schemas
import { Schedule, ScheduleStatus } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class SchedulesService {
  private schedules: Schedule[] = [];

  getAllSchedules(): Schedule[] {
    return this.schedules;
  }

  getScheduleById(id: string): Schedule {
    return this.schedules.find((schedule) => schedule.id === id);
  }

  createSchedule(createScheduleDto: CreateScheduleDto): Schedule {
    const { scheduledDate, title } = createScheduleDto;

    const schedule: Schedule = {
      id: uuid(),
      scheduledDate,
      title,
      status: ScheduleStatus.INITIATED,
    };

    this.schedules.push(schedule);

    return schedule;
  }
}
