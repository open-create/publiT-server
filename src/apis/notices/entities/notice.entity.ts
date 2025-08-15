import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

enum NoticeType {
  POST = 'POST',
  COMMENT = 'COMMENT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  PUBBLE_SAVE = 'PUBBLE_SAVE',
  PUBBLE_COMMENT = 'PUBBLE_COMMENT',
  OFFICIAL = 'OFFICIAL',
}

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  receiver: User;

  @Column({ type: 'enum', enum: NoticeType })
  type: NoticeType;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column()
  referencedId: string;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  createdAt: Date;
}
