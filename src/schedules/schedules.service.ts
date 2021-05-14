// core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// schemas
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { ScheduleStatus } from './schedule-status.enums';
import { Schedule } from './schedule.entity';
import { User } from '../auth/user.entity';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleRepository)
    private scheduleRepository: ScheduleRepository,
  ) {}

  async getSchedules(
    filterDto: GetSchedulesFilterDto,
    user: User,
  ): Promise<Schedule[]> {
    return this.scheduleRepository.getSchedules(filterDto, user);
  }

  async getScheduleById(id: number, user: User): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }

    return schedule;
  }

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
    user: User,
  ): Promise<Schedule> {
    return this.scheduleRepository.createSchedule(createScheduleDto, user);
  }

  async deleteSchedule(id: number, user: User): Promise<void> {
    const result = await this.scheduleRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
  }

  async updateScheduleStatus(
    id: number,
    status: ScheduleStatus,
    user: User,
  ): Promise<Schedule> {
    const schedule = await this.getScheduleById(id, user);
    schedule.status = status;
    await schedule.save();

    return schedule;
  }
}
