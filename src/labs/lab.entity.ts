// core
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// schemas
import { User } from '../auth/user.entity';
import { Schedule } from '../schedules/schedule.entity';

@Entity()
export class Lab extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  software: string;

  @Column()
  adHoc: boolean;

  @ManyToOne((type) => User, (user) => user.labs, { eager: false })
  user: User;

  @Column()
  userId: number;

  @ManyToOne((type) => Schedule, (schedule) => schedule.labs, { eager: false })
  schedule: Schedule;

  @Column()
  scheduleId: number;
}
