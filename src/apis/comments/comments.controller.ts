import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentsInput } from './dto/create-comments.input';
import { Request } from 'express';
import { IAuthUser } from 'src/commons/interfaces/context';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @Post('/:pubbleId')
  createComment(
    @Body('createCommentsInput') createCommentsInput: CreateCommentsInput,
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException('unauthorized');
    return this.commentsService.create({
      createCommentsInput,
      authorId: req.user.id,
    });
  }

  @Get('/:pubbleId')
  fetchComments(
    @Param('pubbleId') pubbleId: string, //
  ): Promise<Comment[]> {
    return this.commentsService.findByPubbleId({ pubbleId });
  }

  @Patch('/:id')
  updateComment(
    @Param('id') id: string, //
    @Body('content') content: string,
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException('unauthorized');
    return this.commentsService.update({ id, content, authorId: req.user.id });
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string): Promise<boolean> {
    return this.commentsService.delete({ id });
  }
}
