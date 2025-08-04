import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IPostsServiceCreate,
  IPostsServiceDelete,
  IPostsServiceFindOne,
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

  async findOne({ id }: IPostsServiceFindOne) {
    return await this.postRepository.findOne({
      where: { id },
    });
  }

  update() {
    return 'updated';
  }

  async delete({ id }: IPostsServiceDelete) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    const result = await this.postRepository.softDelete({ id });
    return result.affected ? true : false;
  }
}
