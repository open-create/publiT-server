import { Comment } from 'src/apis/comments/entities/comment.entity';
import { PubbleCategory } from 'src/apis/pubblesCategories/entities/pubbleCategory.entity';
import { PubbleTag } from 'src/apis/pubblesTags/entities/pubbleTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pubble {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'json', nullable: true })
  fileNames: string | null;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: false })
  isDraft: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => PubbleCategory)
  pubbleCategory: PubbleCategory;

  @ManyToMany(() => PubbleTag, (pubbleTag) => pubbleTag.pubbles)
  @JoinTable()
  pubblesTags: PubbleTag[];

  @OneToMany(() => Comment, (comment) => comment.pubble)
  comments: Comment[];
}
