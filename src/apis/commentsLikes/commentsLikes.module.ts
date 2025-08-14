import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './entities/commentLike.entity';
import { CommentsLikesService } from './commentsLikes.service';
import { CommentsLikesController } from './commentsLikes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentLike, //
    ]),
  ],
  controllers: [CommentsLikesController],
  providers: [CommentsLikesService],
})
export class CommentsLikesModule {}
