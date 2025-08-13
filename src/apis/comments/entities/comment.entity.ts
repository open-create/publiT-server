import { Pubble } from 'src/apis/pubbles/entities/pubble.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Comment, { nullable: true })
  parentComment?: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childrenComments?: Comment[];

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Pubble)
  pubble: Pubble;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
