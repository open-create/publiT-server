import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubblesTagsController } from './pubblesTags.controller';
import { PubblesTagsService } from './pubblesTags.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [PubblesTagsController],
  providers: [PubblesTagsService],
})
export class PubblesTagsModule {}
