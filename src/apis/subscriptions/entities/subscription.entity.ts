import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  subscriber: User;

  @ManyToOne(() => User)
  target: User;

  @CreateDateColumn()
  createdAt: Date;
}
