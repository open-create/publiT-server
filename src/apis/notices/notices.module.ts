import { Module } from '@nestjs/common';
import { Notice } from './entities/notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticesService } from './notices.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notice, //
    ]),
  ],
  providers: [
    NoticesService, //
  ],
})
export class NoticesModule {}
