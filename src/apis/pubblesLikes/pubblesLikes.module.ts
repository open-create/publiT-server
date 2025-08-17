import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubbleLike } from './entities/pubbleLike.entity';
import { PubblesLikesController } from './pubblesLikes.controller';
import { PubblesLikesService } from './pubblesLikes.service';
import { PubblesService } from '../pubbles/pubbles.service';
import { Pubble } from '../pubbles/entities/pubble.entity';
import { PubblesTagsModule } from '../pubblesTags/pubblesTags.module';
import { PubblesModule } from '../pubbles/pubbles.module';
import { UsersModule } from '../users/users.module';
import { NoticesModule } from '../notices/notices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pubble,
      PubbleLike, //
    ]),
    PubblesModule,
    PubblesTagsModule,
    UsersModule,
    NoticesModule,
  ],
  controllers: [PubblesLikesController],
  providers: [
    PubblesLikesService, //
    PubblesService,
  ],
})
export class PubblesLikesModule {}
