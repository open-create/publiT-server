import { Module } from '@nestjs/common';
import { PubblesService } from './pubbles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pubble } from './entities/pubble.entity';
import { PubblesController } from './pubbles.controller';
import { PubbleTag } from '../pubblesTags/entities/pubbleTag.entity';
import { PubblesTagsService } from '../pubblesTags/pubblesTags.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PubbleLike } from '../pubblesLikes/entities/pubbleLike.entity';
import { PubblesLikesService } from '../pubblesLikes/pubblesLikes.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pubble, //
      PubbleTag,
      User,
      PubbleLike,
    ]),
  ],
  controllers: [PubblesController],
  providers: [
    PubblesService, //
    PubblesTagsService,
    UsersService,
    PubblesLikesService,
  ],
})
export class PubblesModule {}
