import { Comment } from 'src/apis/comments/entities/comment.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['user', 'comment'])
@Entity()
export class CommentLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Comment)
  comment: Comment;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
