import { NoticeType } from '../entities/notice.entity';

export interface INoticesServiceCreate {
  receiverId: string;
  type: NoticeType;
  referenceId?: string;
  message: string;
}
