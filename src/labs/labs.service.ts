// core
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// schemas
import { CreateLabDto } from './dto/create-lab.dto';
import { Lab } from './lab.entity';
import { User } from '../auth/user.entity';
import { LabRepository } from './lab.repository';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(LabRepository)
    private labRepository: LabRepository,
  ) {}

  async getLabSoftwareRequests(user: User): Promise<Lab[]> {
    return this.labRepository.getLabSoftwareRequests(user);
  }

  async getLabSoftwareRequestById(id: number, user: User): Promise<Lab> {
    const lab = await this.labRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!lab) {
      throw new NotFoundException(`Lab with id ${id} not found`);
    }

    return lab;
  }

  async createLabSoftwareRequest(
    createLabDto: CreateLabDto,
    user: User,
  ): Promise<Lab> {
    return this.labRepository.createLabSoftwareRequest(createLabDto, user);
  }

  async deleteLabSoftwareRequest(id: number, user: User): Promise<void> {
    const result = await this.labRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Lab with id ${id} not found`);
    }
  }
}
