import { Module } from '@nestjs/common';
import { Notice } from './entities/notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticesService } from './notices.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notice, //
      User,
    ]),
    UsersModule,
  ],
  providers: [
    NoticesService, //
    UsersService,
  ],
  exports: [NoticesService],
})
export class NoticesModule {}
