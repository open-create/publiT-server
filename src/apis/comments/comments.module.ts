import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubblesService } from '../pubbles/pubbles.service';
import { Pubble } from '../pubbles/entities/pubble.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment, //
      Pubble,
      User,
    ]),
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService, //
    PubblesService,
    UsersService,
  ],
})
export class CommentsModule {}
