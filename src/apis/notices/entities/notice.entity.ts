import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum NoticeType {
  PUBBLE_LIKE = 'PUBBLE_LIKE', //                     create PubbleLike occurred
  SUBSCRIPTION_NEW_POST = 'SUBSCRIPTION_NEW_POST', // create Pubble occurred
  COMMENT = 'COMMENT', //                             create Comment occurred
  SUBSCRIPTION = 'SUBSCRIPTION', //                   create Subscription occurred
  OFFICIAL = 'OFFICIAL', //                           create Official Notice occurred
  REPORT = 'REPORT', //                               create Report occurred
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
  referenceId: string;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  createdAt: Date;
}
