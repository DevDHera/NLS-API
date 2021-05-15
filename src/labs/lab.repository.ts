import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { CreateLabDto } from './dto/create-lab.dto';
import { User } from '../auth/user.entity';
import { Lab } from './lab.entity';

@EntityRepository(Lab)
export class LabRepository extends Repository<Lab> {
  private logger = new Logger('LabRepository');

  async getLabSoftwareRequests(user: User): Promise<Lab[]> {
    const query = this.createQueryBuilder('lab');

    query.where('lab.userId = :userId', { userId: user.id });

    try {
      const labs = await query.getMany();
      return labs;
    } catch (error) {
      this.logger.error(
        `Failed to get labs for user: ${user.email}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createLabSoftwareRequest(
    createLabDto: CreateLabDto,
    user: User,
  ): Promise<Lab> {
    const { software, adHoc, scheduleId } = createLabDto;

    const lab = new Lab();
    lab.software = software;
    lab.adHoc = adHoc;
    lab.schedule = user.schedules.find((s) => (s.id = scheduleId));
    lab.user = user;

    try {
      await lab.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a lab for user: ${user.email}. Data: ${JSON.stringify(
          createLabDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete lab.user;

    return lab;
  }
}
