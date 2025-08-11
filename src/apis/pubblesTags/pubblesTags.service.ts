import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleTag } from './entities/pubbleTag.entity';
import { Repository } from 'typeorm';
import { IProductsTagsBulkInsert } from './interfaces/pubblesTags.interface';

@Injectable()
export class PubblesTagsService {
  constructor(
    @InjectRepository(PubbleTag)
    private readonly pubblesTagsRepository: Repository<PubbleTag>, //
  ) {}

  async findAll(): Promise<PubbleTag[]> {
    return await this.pubblesTagsRepository.find();
  }

  async bulkInsert({ names }: IProductsTagsBulkInsert) {
    return await this.pubblesTagsRepository.insert(names);
  }
}
