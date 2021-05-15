import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../auth/user.entity';
import { Notification } from './notification.entity';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  private logger = new Logger('NotificationRepository');

  async getNotifications(user: User): Promise<Notification[]> {
    const query = this.createQueryBuilder('notification');

    query.where('notification.userId = :userId', { userId: user.id });

    try {
      const schedules = await query.getMany();
      return schedules;
    } catch (error) {
      this.logger.error(
        `Failed to get notifications for user: ${user.email}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
    user: User,
  ): Promise<Notification> {
    const { endpoint, expirationTime, auth, p256dh } = createNotificationDto;

    const notification = new Notification();
    notification.endpoint = endpoint;
    notification.expirationTime = expirationTime;
    notification.auth = auth;
    notification.p256dh = p256dh;
    notification.user = user;

    try {
      await notification.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a notification for user: ${
          user.email
        }. Data: ${JSON.stringify(createNotificationDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete notification.user;

    return notification;
  }
}
