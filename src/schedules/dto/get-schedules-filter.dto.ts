// core
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

// schemas
import { ScheduleStatus } from '../schedule-status.enums';

export class GetSchedulesFilterDto {
  @ApiProperty({ required: false, enum: ScheduleStatus })
  @IsOptional()
  //   @IsIn([
  //     ScheduleStatus.INITIATED,
  //     ScheduleStatus.ACCEPTED,
  //     ScheduleStatus.REJECTED,
  //   ])
  @IsEnum(ScheduleStatus, {
    message:
      `"$value" is an invalid status. ` +
      `The allowed values are: ${Object.keys(ScheduleStatus)}`,
  })
  status: ScheduleStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
