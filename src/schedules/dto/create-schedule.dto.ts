// core
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  scheduledDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
