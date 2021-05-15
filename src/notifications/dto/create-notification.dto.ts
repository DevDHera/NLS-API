// core
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  endpoint: string;

  @ApiProperty()
  expirationTime: string;

  @ApiProperty()
  @IsNotEmpty()
  auth: string;

  @ApiProperty()
  @IsNotEmpty()
  p256dh: string;
}
