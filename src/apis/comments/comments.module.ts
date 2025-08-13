import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubblesService } from '../pubbles/pubbles.service';
import { Pubble } from '../pubbles/entities/pubble.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Comment } from './entities/comment.entity';
import { PubblesTagsModule } from '../pubblesTags/pubblesTags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment, //
      Pubble,
      User,
    ]),
    PubblesTagsModule,
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService, //
    PubblesService,
    UsersService,
  ],
})
export class CommentsModule {}
