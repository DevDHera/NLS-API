// core
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { HallType } from '../hall-type.enums';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  scheduledDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  module: string;

  @ApiProperty()
  @IsNotEmpty()
  batch: string;

  @ApiProperty()
  @IsNotEmpty()
  hall: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(HallType)
  hallType: HallType;
}
