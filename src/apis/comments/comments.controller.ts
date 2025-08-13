import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService, //
  ) {}

  @Post()
  createComment() {}

  @Get('/:id')
  fetchComment(
    @Param('id') pubbleId: string, //
  ) {
    return this.commentsService.findByPubbleId({ pubbleId });
  }

  @Delete()
  deleteComment() {}
}
