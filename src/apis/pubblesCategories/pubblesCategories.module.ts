import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubbleCategory } from './entities/pubbleCategory.entity';
import { PubblesCategoriesController } from './pubblesCategories.controller';
import { PubblesCategoriesService } from './pubblesCategories.service';
import { Pubble } from '../pubbles/entities/pubble.entity';
import { PubblesService } from '../pubbles/pubbles.service';
import { PubblesTagsService } from '../pubblesTags/pubblesTags.service';
import { PubbleTag } from '../pubblesTags/entities/pubbleTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PubbleCategory, //
      Pubble,
      PubbleTag,
    ]),
  ],
  controllers: [PubblesCategoriesController],
  providers: [
    PubblesCategoriesService, //
    PubblesService,
    PubblesTagsService,
  ],
})
export class PubblesCategoriesModule {}
