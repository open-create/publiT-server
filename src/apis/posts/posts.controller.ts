import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsInput } from './dto/create-posts.input';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService, //
  ) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  create(
    @Body() createPostsInput: CreatePostsInput, //
  ) {
    console.log('asdf');
    return this.postsService.create({ createPostsInput });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete({ id });
  }

  @Put(':id')
  update(): string {
    return this.postsService.update();
  }
}
