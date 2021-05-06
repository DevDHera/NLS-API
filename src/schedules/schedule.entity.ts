// core
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// schemas
import { ScheduleStatus } from './schedule-status.enums';

@Entity()
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheduledDate: Date;

  @Column()
  title: string;

  @Column()
  status: ScheduleStatus;
}
