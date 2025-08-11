import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleTag } from './entities/pubbleTag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PubblesTagsService {
  constructor(
    @InjectRepository(PubbleTag)
    private readonly pubblesTagsRepository: Repository<PubbleTag>, //
  ) {}

  create() {}

  async findAll(): Promise<PubbleTag[]> {
    return await this.pubblesTagsRepository.find();
  }
}
