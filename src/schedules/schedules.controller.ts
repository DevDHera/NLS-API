// core
import { Controller, Get } from '@nestjs/common';

// services
import { SchedulesService } from './schedules.service';

// schemas
import { Schedule } from './schedule.model';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getAllSchedules(): Schedule[] {
    return this.schedulesService.getAllSchedules();
  }
}
