import { Pubble } from 'src/apis/pubbles/entities/pubble.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn('uuid')
  id;

  @ManyToOne(() => Pubble)
  pubble: Pubble;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
