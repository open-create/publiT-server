import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentLike } from './entities/commentLike.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsLikesService {
  constructor(
    @InjectRepository(CommentLike)
    private readonly commentsLikesRepository: Repository<CommentLike>,
  ) {}
}
