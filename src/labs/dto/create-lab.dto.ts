// core
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLabDto {
  @ApiProperty()
  @IsNotEmpty()
  software: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  adHoc: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
