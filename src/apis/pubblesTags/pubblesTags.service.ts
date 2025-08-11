import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleTag } from './entities/pubbleTag.entity';
import { In, Repository } from 'typeorm';
import { IProductsTagsBulkInsert } from './interfaces/pubblesTags.interface';
import { IProductsTagsFindByNames } from '../pubblesCategories/interfaces/pubblesCategories.interface';

@Injectable()
export class PubblesTagsService {
  constructor(
    @InjectRepository(PubbleTag)
    private readonly pubblesTagsRepository: Repository<PubbleTag>, //
  ) {}

  async findAll(): Promise<PubbleTag[]> {
    return await this.pubblesTagsRepository.find();
  }

  async findByNames({ tagNames }: IProductsTagsFindByNames) {
    return await this.pubblesTagsRepository.find({
      // tagNames안에 포함되어있는 것들 모두 조회
      where: { name: In(tagNames) },
    });
  }

  async bulkInsert({ names }: IProductsTagsBulkInsert) {
    return await this.pubblesTagsRepository.insert(names);
  }
}
