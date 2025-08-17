import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  ICommentsServiceCreate,
  ICommentsServiceDelete,
  ICommentsServiceFindByPubbleId,
  ICommentsServiceFindOne,
  ICommentsServiceUpdate,
} from './interfaces/comments.interface';
import { PubblesService } from '../pubbles/pubbles.service';
import { UsersService } from '../users/users.service';
import { NoticesService } from '../notices/notices.service';
import { NoticeType } from '../notices/entities/notice.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>, //
    private readonly pubblesService: PubblesService,
    private readonly usersService: UsersService,
    private readonly noticesService: NoticesService,
  ) {}

  async create({ createCommentsInput, authorId }: ICommentsServiceCreate) {
    const { content, parentId, pubbleId } = createCommentsInput;
    // pubble
    const pubble = await this.pubblesService.findOne({ id: pubbleId });
    if (!pubble)
      throw new UnprocessableEntityException(
        'there is no pubble or deleted pubble',
      );
    // user
    const user = await this.usersService.findOne({ id: authorId });
    if (!user) throw new UnprocessableEntityException('there is no user');
    // parent comment
    let comment: Comment | null = null;
    if (parentId) {
      comment = await this.findOne({ id: parentId });
      if (!comment)
        throw new UnprocessableEntityException(
          'there is no such a parent comment',
        );
    }
    // notice
    await this.noticesService.create({
      type: NoticeType.COMMENT,
      message: content,
      referenceId: pubbleId,
      receiverId: user.id,
    });
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
      relations: ['childrenComments', 'author'],
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
      relations: ['childrenComments', 'author'],
    });
  }

  async update({ id, content, authorId }: ICommentsServiceUpdate) {
    // comment
    const comment = await this.findOne({ id });
    if (!comment)
      throw new UnprocessableEntityException(
        `there is no comment with id: ${id}`,
      );
    // user
    if (comment.author.id != authorId)
      throw new UnprocessableEntityException('author is not correct.');
    Object.assign(comment, { content });
    return this.commentsRepository.save(comment);
  }

  async delete({ id, authorId }: ICommentsServiceDelete): Promise<boolean> {
    // comment
    const comment = await this.findOne({ id });
    if (!comment)
      throw new UnprocessableEntityException(
        `there is no comment with id: ${id}`,
      );
    if (comment.childrenComments && comment.childrenComments.length > 0)
      throw new UnprocessableEntityException(
        "there is children comments. so can't delete this comment.",
      );
    // user
    if (comment.author.id != authorId)
      throw new UnprocessableEntityException('author is not correct.');
    const result = await this.commentsRepository.softDelete(id);
    return result.affected ? true : false;
  }
}
