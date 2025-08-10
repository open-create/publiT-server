import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleCategory } from './entities/pubbleCategory.entity';
import { Repository } from 'typeorm';
import { IPubblesCategoriesServiceFindOne } from './interfaces/pubblesCategories.interface';

@Injectable()
export class pubblesCategoriesService {
  constructor(
    @InjectRepository(PubbleCategory)
    private readonly pubblesCategoriesRepository: Repository<PubbleCategory>, //
  ) {}

  async findOne({ id }: IPubblesCategoriesServiceFindOne) {
    return await this.pubblesCategoriesRepository.findOne({ where: { id } });
  }
}
