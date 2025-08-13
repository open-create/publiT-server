import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pubble } from './entities/pubble.entity';
import {
  IPubbleServiceFindByCategory,
  IPubblesServiceCreate,
  IPubblesServiceDelete,
  IPubblesServiceFindOne,
  IPubblesServiceUpdate,
  IPubblesServiceUpdatePartial,
} from './interfaces/pubbles.interface';
import { PubblesTagsService } from '../pubblesTags/pubblesTags.service';
import { PubbleTag } from '../pubblesTags/entities/pubbleTag.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PubblesService {
  constructor(
    @InjectRepository(Pubble)
    private readonly pubblesRepository: Repository<Pubble>, //
    private readonly pubblesTagsService: PubblesTagsService,
    private readonly usersService: UsersService,
  ) {}

  async create({
    createPubbleInput,
    id,
  }: IPubblesServiceCreate): Promise<Pubble> {
    const { pubbleCategoryId, pubblesTags, ...pubbleInput } = createPubbleInput;

    // user
    const user = await this.usersService.findOne({ id });

    // tags
    const tagNames = pubblesTags.map((el) => el.replace('#', ''));
    const prevTags = await this.pubblesTagsService.findByNames({ tagNames });
    const temp: { name: string }[] = [];
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });
    const newTags = await this.pubblesTagsService.bulkInsert({ names: temp });
    const tags = [...prevTags, ...newTags.identifiers];

    return await this.pubblesRepository.save({
      ...pubbleInput,
      pubbleCategory: { id: pubbleCategoryId },
      pubblesTags: tags,
      author: user,
    });
  }

  async findAll(): Promise<Pubble[]> {
    return await this.pubblesRepository.find({
      order: { created_at: 'DESC' },
      relations: ['pubbleCategory', 'author', 'pubblesTags'],
    });
  }

  async findOne({ id }: IPubblesServiceFindOne): Promise<Pubble> {
    const pubble = await this.pubblesRepository.findOne({
      where: { id },
      relations: ['pubbleCategory', 'author', 'pubblesTags'],
    });
    if (!pubble)
      throw new UnprocessableEntityException(`Pubble with ID ${id} not found`);
    return pubble;
  }

  async findByCategory({ pubbleCategoryId }: IPubbleServiceFindByCategory) {
    return await this.pubblesRepository.find({
      where: { pubbleCategory: { id: pubbleCategoryId } },
    });
  }

  async update({
    id,
    updatePubbleInput,
  }: IPubblesServiceUpdate): Promise<Pubble> {
    const pubble = await this.findOne({ id });
    const { pubblesTags, ...temp } = updatePubbleInput;

    // tags
    let tags: PubbleTag[];
    if (pubblesTags)
      tags = await this.pubblesTagsService.findByNames({
        tagNames: pubblesTags,
      });
    else tags = [];

    Object.assign(pubble, { ...temp, tags });
    return this.pubblesRepository.save(pubble);
  }

  async updatePartial({
    id,
    updatePartialPubbleInput,
  }: IPubblesServiceUpdatePartial): Promise<Pubble> {
    const pubble = await this.findOne({ id });
    const { pubblesTags, ...temp } = updatePartialPubbleInput;
    let tags: PubbleTag[];
    if (pubblesTags)
      tags = await this.pubblesTagsService.findByNames({
        tagNames: pubblesTags,
      });
    else tags = [];

    Object.assign(pubble, { ...temp, tags });
    return await this.pubblesRepository.save(pubble);
  }

  async delete({ id }: IPubblesServiceDelete): Promise<boolean> {
    // 만약 id로 조회한 결과가 없다면 예외 발생
    await this.findOne({ id });
    const result = await this.pubblesRepository.softDelete({ id });
    return result.affected ? true : false;
  }
}
