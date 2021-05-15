// core
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// schemas
import { ScheduleStatus } from './schedule-status.enums';
import { User } from '../auth/user.entity';
import { HallType } from './hall-type.enums';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduledDate: Date;

  @Column()
  endDate: Date;

  @Column()
  module: string;

  @Column()
  batch: string;

  @Column()
  hall: string;

  @Column()
  hallType: HallType;

  @Column()
  status: ScheduleStatus;

  @ManyToOne((type) => User, (user) => user.schedules, { eager: false })
  user: User;

  @Column()
  userId: number;
}
