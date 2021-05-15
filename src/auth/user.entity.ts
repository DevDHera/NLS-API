// core
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Schedule } from '../schedules/schedule.entity';
import { Notification } from '../notifications/notification.entity';
import { Lab } from '../labs/lab.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.user, { eager: true })
  schedules: Schedule[];

  @OneToMany((type) => Notification, (n) => n.user, { eager: true })
  notifications: Notification[];

  @OneToMany((type) => Lab, (lab) => lab.user, { eager: true })
  labs: Lab[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
