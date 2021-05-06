// core
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

// schemas
import { Schedule, ScheduleStatus } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';

@Injectable()
export class SchedulesService {
  private schedules: Schedule[] = [];

  getAllSchedules(): Schedule[] {
    return this.schedules;
  }

  getSchedulesWithFilters(filterDto: GetSchedulesFilterDto): Schedule[] {
    const { status, search } = filterDto;

    let schedules = this.getAllSchedules();

    if (status) {
      schedules = schedules.filter((schedule) => schedule.status === status);
    }

    if (search) {
      schedules = schedules.filter((schedule) =>
        schedule.title.includes(search),
      );
    }

    return schedules;
  }

  getScheduleById(id: string): Schedule {
    const schedule = this.schedules.find((schedule) => schedule.id === id);

    if (!schedule) {
      throw new NotFoundException();
    }

    return schedule;
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

  deleteSchedule(id: string): void {
    const schedule = this.getScheduleById(id);
    this.schedules = this.schedules.filter((s) => s.id !== schedule.id);
  }

  updateScheduleStatus(id: string, status: ScheduleStatus): Schedule {
    const schedule = this.getScheduleById(id);
    schedule.status = status;
    return schedule;
  }
}
