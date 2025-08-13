import { Pubble } from 'src/apis/pubbles/entities/pubble.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Comment, { nullable: true })
  parent_id: Comment;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Pubble)
  pubble: Pubble;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
