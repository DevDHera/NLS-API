import { Test } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { ScheduleRepository } from './schedule.repository';
import { GetSchedulesFilterDto } from './dto/get-schedules-filter.dto';
import { ScheduleStatus } from './schedule-status.enums';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, email: 'test01@nibm.lk' };

const mockScheduleRepository = () => ({
  getSchedules: jest.fn(),
  findOne: jest.fn(),
  createSchedule: jest.fn(),
  delete: jest.fn(),
});

describe('ScheduleService', () => {
  let schedulesService;
  let scheduleRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SchedulesService,
        { provide: ScheduleRepository, useFactory: mockScheduleRepository },
      ],
    }).compile();

    schedulesService = await module.get<SchedulesService>(SchedulesService);
    scheduleRepository = await module.get<ScheduleRepository>(
      ScheduleRepository,
    );
  });

  describe('getSchedules', () => {
    it('gets all schedules from the repository', async () => {
      scheduleRepository.getSchedules.mockResolvedValue('someValue');

      expect(scheduleRepository.getSchedules).not.toHaveBeenCalled();
      const filters: GetSchedulesFilterDto = {
        status: ScheduleStatus.INITIATED,
        search: 'Some search query',
      };
      const result = await schedulesService.getSchedules(filters, mockUser);
      expect(scheduleRepository.getSchedules).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getScheduleById', () => {
    it('calls scheduleRepository.findOne() and successfully retrieve and return the schedule', async () => {
      const mockSchedule = {
        title: 'Test schedule',
        scheduledDate: '2021-05-04',
      };
      scheduleRepository.findOne.mockResolvedValue(mockSchedule);

      const result = await schedulesService.getScheduleById(1, mockUser);
      expect(result).toEqual(mockSchedule);

      expect(scheduleRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as schedule is not found', () => {
      scheduleRepository.findOne.mockResolvedValue(null);
      expect(schedulesService.getScheduleById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createSchedule', () => {
    it('calls scheduleRepository.create() and returns the result', async () => {
      scheduleRepository.createSchedule.mockResolvedValue('someSchedule');

      expect(scheduleRepository.createSchedule).not.toHaveBeenCalled();
      const createScheduleDto = {
        title: 'Test schedule',
        scheduledDate: '2021-05-04',
      };
      const result = await schedulesService.createSchedule(
        createScheduleDto,
        mockUser,
      );
      expect(scheduleRepository.createSchedule).toHaveBeenCalledWith(
        createScheduleDto,
        mockUser,
      );
      expect(result).toEqual('someSchedule');
    });
  });

  describe('deleteSchedule', () => {
    it('calls scheduleRepository.deleteSchedule() to delete a schedule', async () => {
      scheduleRepository.delete.mockResolvedValue({ affected: 1 });
      expect(scheduleRepository.delete).not.toHaveBeenCalled();
      await schedulesService.deleteSchedule(1, mockUser);
      expect(scheduleRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('throws an error as schedule could not be found', () => {
      scheduleRepository.delete.mockResolvedValue({ affected: 0 });
      expect(schedulesService.deleteSchedule(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateScheduleStatus', () => {
    it('updates a schedule status', async () => {
      const save = jest.fn().mockResolvedValue(true);

      schedulesService.getScheduleById = jest.fn().mockResolvedValue({
        status: ScheduleStatus.INITIATED,
        save,
      });

      expect(schedulesService.getScheduleById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      const result = await schedulesService.updateScheduleStatus(
        1,
        ScheduleStatus.ACCEPTED,
        mockUser,
      );
      expect(schedulesService.getScheduleById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(ScheduleStatus.ACCEPTED);
    });
  });
});
