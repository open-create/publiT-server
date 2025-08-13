import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { ICommentsServiceFindByPubbleId } from './interfaces/comments.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //
  ) {}

  async findByPubbleId({ pubbleId }: ICommentsServiceFindByPubbleId) {
    return await this.commentsRepository.find({
      where: { pubble: { id: pubbleId } },
    });
  }
}
