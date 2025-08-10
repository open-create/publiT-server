import { Module } from '@nestjs/common';
import { pubblesCategoriesController } from './pubblesCategories.controller';
import { pubblesCategoriesService } from './pubblesCategories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pubbleCategory } from './entities/pubbleCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      pubbleCategory, //
    ]),
  ],
  controllers: [pubblesCategoriesController],
  providers: [pubblesCategoriesService],
})
export class pubblesCategoriesModule {}
