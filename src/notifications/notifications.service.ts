// core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// schemas
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './notification.entity';
import { User } from '../auth/user.entity';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationRepository)
    private notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(user: User): Promise<Notification[]> {
    return this.notificationRepository.getNotifications(user);
  }

  async getNotificationById(id: number, user: User): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    return notification;
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
    user: User,
  ): Promise<Notification> {
    return this.notificationRepository.createNotification(
      createNotificationDto,
      user,
    );
  }

  async deleteNotification(id: number, user: User): Promise<void> {
    const result = await this.notificationRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }
  }
}
