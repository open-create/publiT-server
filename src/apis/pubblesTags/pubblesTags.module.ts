import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubblesTagsController } from './pubblesTags.controller';
import { PubblesTagsService } from './pubblesTags.service';
import { PubbleTag } from './entities/pubbleTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PubbleTag, //
    ]),
  ],
  controllers: [PubblesTagsController],
  providers: [PubblesTagsService],
  exports: [PubblesTagsService],
})
export class PubblesTagsModule {}
