import { Notice } from 'src/apis/notices/entities/notice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  profile_img: string;

  @OneToMany(() => Notice, (notice) => notice.receiver)
  notifications: Notice[];

  @CreateDateColumn()
  createdAt: Date;
}
