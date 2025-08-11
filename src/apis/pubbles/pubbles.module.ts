import { Module } from '@nestjs/common';
import { PubblesService } from './pubbles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pubble } from './entities/pubble.entity';
import { PubblesController } from './pubbles.controller';
import { PubbleTag } from '../pubblesTags/entities/pubbleTag.entity';
import { PubblesTagsService } from '../pubblesTags/pubblesTags.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pubble, //
      PubbleTag,
    ]),
  ],
  controllers: [PubblesController],
  providers: [
    PubblesService, //
    PubblesTagsService,
  ],
})
export class PubblesModule {}
