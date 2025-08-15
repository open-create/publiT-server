import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubblesModule } from './apis/pubbles/pubbles.module';
import { AuthModule } from './apis/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apis/users/users.module';
import { PubblesCategoriesModule } from './apis/pubblesCategories/pubblesCategories.module';
import { PubblesTagsModule } from './apis/pubblesTags/pubblesTags.module';
import { CommentsModule } from './apis/comments/comments.module';
import { FilesModule } from './apis/files/files.moddule';
import { NoticesModule } from './apis/notices/notices.module';
import { PubblesLikesModule } from './apis/pubblesLikes/pubblesLikes.module';

@Module({
  imports: [
    AuthModule,
    PubblesModule,
    PubblesLikesModule,
    PubblesCategoriesModule,
    PubblesTagsModule,
    FilesModule,
    UsersModule,
    CommentsModule,
    NoticesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ...(process.env.NODE_ENV === 'prod'
        ? { socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` }
        : {
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
          }),
    }),
  ],
})
export class AppModule {}
