import { Pubble } from 'src/apis/pubbles/entities/pubble.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['user', 'pubble'])
@Entity()
export class PubbleLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Pubble)
  pubble: Pubble;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
