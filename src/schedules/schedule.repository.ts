import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { ScheduleStatus } from './schedule-status.enums';
import { Schedule } from './schedule.entity';
import { User } from '../auth/user.entity';

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
        '(schedule.title LIKE :search OR schedule.scheduledDate LIKE :search)',
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
    const { scheduledDate, title } = createScheduleDto;

    const schedule = new Schedule();
    schedule.scheduledDate = scheduledDate;
    schedule.title = title;
    schedule.status = ScheduleStatus.INITIATED;
    schedule.user = user;

    try {
      await schedule.save();
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
}
