import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubbleCategory } from './entities/pubbleCategory.entity';
import { PubblesCategoriesController } from './pubblesCategories.controller';
import { PubblesCategoriesService } from './pubblesCategories.service';
import { Pubble } from '../pubbles/entities/pubble.entity';
import { PubblesService } from '../pubbles/pubbles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PubbleCategory, //
      Pubble,
    ]),
  ],
  controllers: [PubblesCategoriesController],
  providers: [
    PubblesCategoriesService, //
    PubblesService,
  ],
})
export class PubblesCategoriesModule {}
