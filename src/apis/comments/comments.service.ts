import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  ICommentsServiceDelete,
  ICommentsServiceFindByPubbleId,
  ICommentsServiceFindOne,
} from './interfaces/comments.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //
  ) {}

  async findOne({ id }: ICommentsServiceFindOne) {
    return await this.commentsRepository.findOne({ where: { id } });
  }

  async findByPubbleId({
    pubbleId,
  }: ICommentsServiceFindByPubbleId): Promise<Comment[]> {
    return await this.commentsRepository.find({
      where: { pubble: { id: pubbleId } },
    });
  }

  async delete({ id }: ICommentsServiceDelete): Promise<boolean> {
    const comment = await this.findOne({ id });
    if (!comment)
      throw new UnprocessableEntityException(
        `there is no comment with id: ${id}`,
      );
    const result = await this.commentsRepository.delete(comment);
    return result.affected ? true : false;
  }
}
