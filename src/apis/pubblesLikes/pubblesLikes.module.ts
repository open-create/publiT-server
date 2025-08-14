import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubbleLike } from './entities/pubbleLike.entity';
import { PubblesLikesController } from './pubblesLikes.controller';
import { PubblesLikesService } from './pubblesLikes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PubbleLike, //
    ]),
  ],
  controllers: [PubblesLikesController],
  providers: [PubblesLikesService],
})
export class PubblesModule {}
