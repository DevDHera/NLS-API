// core
import { ApiProperty } from '@nestjs/swagger';

// schemas
import { ScheduleStatus } from '../schedule.model';

export class GetSchedulesFilterDto {
  @ApiProperty({ required: false, enum: ScheduleStatus })
  status: ScheduleStatus;

  @ApiProperty({ required: false })
  search: string;
}
