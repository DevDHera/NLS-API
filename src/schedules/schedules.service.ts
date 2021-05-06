// core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// schemas
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { ScheduleStatus } from './schedule-status.enums';
import { Schedule } from './schedule.entity';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleRepository)
    private scheduleRepository: ScheduleRepository,
  ) {}

  async getSchedules(filterDto: GetSchedulesFilterDto): Promise<Schedule[]> {
    return this.scheduleRepository.getSchedules(filterDto);
  }

  async getScheduleById(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne(id);

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }

    return schedule;
  }

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    return this.scheduleRepository.createSchedule(createScheduleDto);
  }

  async deleteSchedule(id: number): Promise<void> {
    const result = await this.scheduleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
  }

  async updateScheduleStatus(
    id: number,
    status: ScheduleStatus,
  ): Promise<Schedule> {
    const schedule = await this.getScheduleById(id);
    schedule.status = status;
    await schedule.save();

    return schedule;
  }
}
