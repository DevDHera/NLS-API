import { EntityRepository, Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { ScheduleStatus } from './schedule-status.enums';
import { Schedule } from './schedule.entity';
import { User } from '../auth/user.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async getSchedules(filterDto: GetSchedulesFilterDto): Promise<Schedule[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('schedule');

    if (status) {
      query.andWhere('schedule.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(schedule.title LIKE :search OR schedule.scheduledDate LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const schedules = await query.getMany();
    return schedules;
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
    await schedule.save();

    delete schedule.user;

    return schedule;
  }
}
