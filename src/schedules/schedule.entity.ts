// core
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// schemas
import { ScheduleStatus } from './schedule-status.enums';
import { User } from '../auth/user.entity';
import { HallType } from './hall-type.enums';
import { Lab } from '../labs/lab.entity';

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

  @OneToMany((type) => Lab, (lab) => lab.user, { eager: true })
  labs: Lab[];
}
