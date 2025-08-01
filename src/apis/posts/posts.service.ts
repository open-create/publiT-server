import { Injectable } from '@nestjs/common';
import {
  IPostsServiceCreate,
  IPostsServiceDelete,
} from './interfaces/posts.interface';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create({ createPostsInput }: IPostsServiceCreate) {
    const post = this.postRepository.create(createPostsInput);
    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  update() {
    return 'updated';
  }

  async delete({ id }: IPostsServiceDelete) {
    await this.postRepository.delete(id);
    return 'deleted';
  }
}
