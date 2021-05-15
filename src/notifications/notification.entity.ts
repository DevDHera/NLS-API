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

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  endpoint: string;

  @Column({ nullable: true })
  expirationTime: string;

  @Column()
  auth: string;

  @Column()
  p256dh: string;

  @ManyToOne((type) => User, (user) => user.notifications, { eager: false })
  user: User;

  @Column()
  userId: number;
}
