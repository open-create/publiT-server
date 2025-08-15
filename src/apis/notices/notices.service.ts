import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice, NoticeType } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticesRepository: Repository<Notice>,
    private readonly usersService: UsersService,
  ) {}

  async create({
    receiverId,
    type,
    referenceId,
    message,
  }: {
    receiverId: string;
    type: NoticeType;
    referenceId?: string;
    message: string;
  }) {
    const user = await this.usersService.findOne({ id: receiverId });
    if (!user) throw new UnprocessableEntityException('User not found');
    const notification = this.noticesRepository.create({
      receiver: user,
      type,
      referenceId,
      message,
    });
    return this.noticesRepository.save(notification);
  }
}
