// core
import { ApiProperty } from '@nestjs/swagger';

// schemas
import { ScheduleStatus } from '../schedule.model';

export class GetSchedulesFilterDto {
  @ApiProperty()
  status: ScheduleStatus;

  @ApiProperty()
  search: string;
}
