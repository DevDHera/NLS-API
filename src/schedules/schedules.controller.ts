// core
import { Controller, Get } from '@nestjs/common';

// services
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  getAllSchedules() {
    return this.schedulesService.getAllSchedules();
  }
}
