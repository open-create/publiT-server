import { PubbleCategory } from 'src/apis/pubblesCategories/entities/pubbleCategory.entity';
import { PubbleTag } from 'src/apis/pubblesTags/entities/pubbleTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => PubbleCategory)
  pubbleCategory: PubbleCategory;

  @ManyToMany(() => PubbleTag, (pubbleTag) => pubbleTag.pubbles)
  pubbleTags: PubbleTag[];
}
