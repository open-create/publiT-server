import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @Post()
  createComment() {}

  @Get('/:pubbleId')
  fetchComments(
    @Param('pubbleId') pubbleId: string, //
  ): Promise<Comment[]> {
    return this.commentsService.findByPubbleId({ pubbleId });
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string): Promise<boolean> {
    return this.commentsService.delete({ id });
  }
}
