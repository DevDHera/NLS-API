// core
import { BadRequestException, PipeTransform } from '@nestjs/common';

// schemas
import { ScheduleStatus } from '../schedule.model';

export class ScheduleStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    ScheduleStatus.INITIATED,
    ScheduleStatus.ACCEPTED,
    ScheduleStatus.REJECTED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
