import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { format } from 'date-fns';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { ScheduleStatus } from './schedule-status.enums';
import { Schedule } from './schedule.entity';
import { User } from '../auth/user.entity';

import * as webPush from 'web-push';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  private logger = new Logger('ScheduleRepository');

  async getSchedules(
    filterDto: GetSchedulesFilterDto,
    user: User,
  ): Promise<Schedule[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('schedule');

    query.where('schedule.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('schedule.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(schedule.module LIKE :search OR schedule.scheduledDate LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const schedules = await query.getMany();
      return schedules;
    } catch (error) {
      this.logger.error(
        `Failed to get schedules for user: ${user.email}. DTO: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
    user: User,
  ): Promise<Schedule> {
    const {
      scheduledDate,
      endDate,
      module,
      hall,
      batch,
      hallType,
    } = createScheduleDto;

    const schedule = new Schedule();
    schedule.scheduledDate = scheduledDate;
    schedule.endDate = endDate;
    schedule.module = module;
    schedule.batch = batch;
    schedule.hall = hall;
    schedule.hallType = hallType;
    schedule.status = ScheduleStatus.INITIATED;
    schedule.user = user;

    try {
      await schedule.save();

      if (user.notifications && user.notifications.length > 0) {
        const subs: webPush.PushSubscription[] = user.notifications.map(
          (n) => ({
            endpoint: n.endpoint,
            expirationTime: n.expirationTime,
            keys: { auth: n.auth, p256dh: n.p256dh },
          }),
        );

        subs.forEach((subscription) => {
          // See https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API for more info
          this.sendNotification(
            subscription,
            JSON.stringify({
              notification: {
                title: `New Schedule Alert`,
                actions: [
                  {
                    action: 'opentweet',
                    title: 'Check Schedule',
                  },
                ],
                body: `${module} - ${batch} at ${format(
                  new Date(scheduledDate),
                  'yyyy-MM-dd h:m:a',
                )}`,
                dir: 'auto',
                icon:
                  'https://avatars.githubusercontent.com/u/69686350?s=200&v=4',
                badge:
                  'https://avatars.githubusercontent.com/u/69686350?s=200&v=4',
                renotify: true,
                requireInteraction: true,
                vibrate: [300, 100, 400],
                tag: schedule.id,
                data: {
                  url: `https://twitter.com/statuses/${1}`,
                },
              },
            }),
          );
        });
      }
    } catch (error) {
      this.logger.error(
        `Failed to create a schedule for user: ${
          user.email
        }. Data: ${JSON.stringify(createScheduleDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete schedule.user;

    return schedule;
  }

  sendNotification(subscriptions: webPush.PushSubscription, data: any): any {
    webPush
      .sendNotification(subscriptions, data)
      .then(() => {
        this.logger.debug('Notification sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
