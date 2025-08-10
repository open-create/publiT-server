import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleCategory } from './entities/pubbleCategory.entity';
import { Repository } from 'typeorm';
import {
  IPubblesCategoriesServiceCreate,
  IPubblesCategoriesServiceFindOne,
  IPubblesCategoriesServiceFindOneByName,
} from './interfaces/pubblesCategories.interface';
import { PubblesService } from '../pubbles/pubbles.service';

@Injectable()
export class PubblesCategoriesService {
  constructor(
    @InjectRepository(PubbleCategory)
    private readonly pubblesCategoriesRepository: Repository<PubbleCategory>, //
    private readonly pubblesService: PubblesService,
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

  async update({ id, name }: { id: string; name: string }) {
    const category = await this.findOne({ id });
    if (!category)
      throw new UnprocessableEntityException('this category is not exist');
    Object.assign(category, { name });
    return this.pubblesCategoriesRepository.save(category);
  }

  async delete({ id }: { id: string }) {
    const pubbles = await this.pubblesService.findByCategory({
      pubbleCategoryId: id,
    });
    if (pubbles)
      throw new UnprocessableEntityException(
        `there are pubbles with categoryId ${id}`,
      );
    const category = await this.findOne({ id });
    if (!category)
      throw new UnprocessableEntityException('this category is not exist');
    const result = await this.pubblesCategoriesRepository.delete(id);
    return result.affected ? true : false;
  }
}
