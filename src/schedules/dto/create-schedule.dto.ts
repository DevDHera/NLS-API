// core
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty()
  scheduledDate: string;

  @ApiProperty()
  title: string;
}
