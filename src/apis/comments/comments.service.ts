import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  ICommentsServiceCreate,
  ICommentsServiceDelete,
  ICommentsServiceFindByPubbleId,
  ICommentsServiceFindOne,
} from './interfaces/comments.interface';
import { PubblesService } from '../pubbles/pubbles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //
    private readonly pubblesService: PubblesService,
    private readonly usersService: UsersService,
  ) {}

  async create({ createCommentsInput, authorId }: ICommentsServiceCreate) {
    const { content, parent_id, pubbleId } = createCommentsInput;

    // pubble
    const pubble = await this.pubblesService.findOne({ id: pubbleId });
    if (!pubble)
      throw new UnprocessableEntityException(
        'there is no pubble or deleted pubble',
      );

    // user
    const user = await this.pubblesService.findOne({ id: authorId });
    if (!user) throw new UnprocessableEntityException('there is no user');

    // parent comment
    let comment: Comment | null = null;
    if (parent_id) {
      comment = await this.findOne({ id: parent_id });
      if (!comment)
        throw new UnprocessableEntityException(
          'there is no such a parent comment',
        );
    }

    return await this.commentsRepository.save({
      content,
      parentComment: comment,
      author: user,
      pubble: { id: pubbleId },
    });
  }

  async findOne({ id }: ICommentsServiceFindOne) {
    return await this.commentsRepository.findOne({
      where: { id },
      relations: ['childrenComments'],
    });
  }

  async findByPubbleId({
    pubbleId,
  }: ICommentsServiceFindByPubbleId): Promise<Comment[]> {
    const pubble = await this.pubblesService.findOne({ id: pubbleId });
    if (!pubble)
      throw new UnprocessableEntityException(
        'there is no pubble or deleted pubble',
      );
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
    if (comment.childrenComments && comment.childrenComments.length > 0)
      throw new UnprocessableEntityException(
        "there is children comments. so can't delete this comment.",
      );
    const result = await this.commentsRepository.softDelete(id);
    return result.affected ? true : false;
  }
}
