import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulesService {
  private schedules = [];

  getAllSchedules() {
    return this.schedules;
  }
}
