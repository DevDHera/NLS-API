// core
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// services
import { NotificationsService } from './notifications.service';

// schemas
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../auth/user.entity';
import { Notification } from './notification.entity';

// pipes

// decorators
import { GetUser } from '../auth/get-user.decorator';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(AuthGuard())
export class NotificationsController {
  private logger = new Logger('NotificationsController');

  constructor(private notificationsService: NotificationsService) {}

  @Get()
  getNotifications(@GetUser() user: User): Promise<Notification[]> {
    this.logger.verbose(`User: ${user.email} retrieving all notifications. `);
    return this.notificationsService.getNotifications(user);
  }

  @Get('/:id')
  getNotificationById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Notification> {
    return this.notificationsService.getNotificationById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @GetUser() user: User,
  ): Promise<Notification> {
    this.logger.verbose(
      `User: ${user.email} creating a new notification. Data: ${JSON.stringify(
        createNotificationDto,
      )}`,
    );
    return this.notificationsService.createNotification(
      createNotificationDto,
      user,
    );
  }

  @Delete('/:id')
  deleteNotification(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.notificationsService.deleteNotification(id, user);
  }
}
