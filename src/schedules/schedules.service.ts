// core
import { Injectable } from '@nestjs/common';

// schemas
import { Schedule } from './schedule.model';

@Injectable()
export class SchedulesService {
  private schedules: Schedule[] = [];

  getAllSchedules(): Schedule[] {
    return this.schedules;
  }
}
