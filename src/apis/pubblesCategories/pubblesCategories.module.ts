import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubbleCategory } from './entities/pubbleCategory.entity';
import { PubblesCategoriesController } from './pubblesCategories.controller';
import { PubblesCategoriesService } from './pubblesCategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PubbleCategory, //
    ]),
  ],
  controllers: [PubblesCategoriesController],
  providers: [PubblesCategoriesService],
})
export class PubblesCategoriesModule {}
