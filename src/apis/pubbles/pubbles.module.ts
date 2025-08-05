import { Module } from '@nestjs/common';
import { PubblesService } from './pubbles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pubble } from './entities/pubble.entity';
import { PubblesController } from './pubbles.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pubble, //
    ]),
  ],
  controllers: [PubblesController],
  providers: [PubblesService],
})
export class PubblesModule {}
