import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleCategory } from './entities/pubbleCategory.entity';
import { Repository } from 'typeorm';
import {
  IPubblesCategoriesServiceCreate,
  IPubblesCategoriesServiceFindOne,
  IPubblesCategoriesServiceFindOneByName,
} from './interfaces/pubblesCategories.interface';

@Injectable()
export class PubblesCategoriesService {
  constructor(
    @InjectRepository(PubbleCategory)
    private readonly pubblesCategoriesRepository: Repository<PubbleCategory>, //
  ) {}

  async findOne({ id }: IPubblesCategoriesServiceFindOne) {
    return await this.pubblesCategoriesRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.pubblesCategoriesRepository.find();
  }

  async findOneByName({ name }: IPubblesCategoriesServiceFindOneByName) {
    return await this.pubblesCategoriesRepository.findOne({ where: { name } });
  }

  async create({ name }: IPubblesCategoriesServiceCreate) {
    let pubbleCategory = await this.findOneByName({ name });
    if (pubbleCategory)
      throw new UnprocessableEntityException('this category is already exist');
    pubbleCategory = await this.pubblesCategoriesRepository.save({ name });
    return {
      id: pubbleCategory.id,
      name: pubbleCategory.name,
    };
  }
}
