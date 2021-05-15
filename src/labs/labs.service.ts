// core
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';

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

    private readonly mailerService: MailerService,
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
    const lab = await this.labRepository.createLabSoftwareRequest(
      createLabDto,
      user,
    );

    // send email
    try {
      await this.mailerService.sendMail({
        to: 'labs@nibm.lk, halls@nibm.lk',
        subject: `Lab Software Request: ${lab.schedule.module}`,
        text: `Hi, Lecturer ${user.firstName} ${user.lastName} has requested ${lab.software} to be installed in PCs for ${lab.schedule.module} of ${lab.schedule.batch} at ${lab.schedule.hall}`,
        html:
          '<p>Hi</p>' +
          `<p>Hi, Lecturer <b>${user.firstName}</b> has requested following software to be installed</p>` +
          `<table >
          <tbody>
            <tr>
              <td>Module</td>
              <td>Batch</td>
              <td>Hall</td>
              <td>Scheduled Date</td>
              <td>Whole Module</td>
            </tr>
            <tr>
              <td>${lab.schedule.module}</td>
              <td>${lab.schedule.batch}</td>
              <td>${lab.schedule.hall}</td>
              <td>${lab.schedule.scheduledDate}</td>
              <td>${!lab.adHoc ? 'NO' : 'YES'}</td>
            </tr>
          </tbody>
        </table>` +
          `<p>Cheers,</p>` +
          `<p>NLS Team</p>`,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return lab;
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
