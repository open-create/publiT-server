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

@Injectable()
export class PubblesService {
  constructor(
    @InjectRepository(Pubble)
    private readonly pubblesRepository: Repository<Pubble>,
  ) {}

  async create({ createPubbleInput }: IPubblesServiceCreate): Promise<Pubble> {
    const { pubbleCategoryId, ...pubbleInput } = createPubbleInput;
    const saved = await this.pubblesRepository.save({
      ...pubbleInput,
      pubbleCategory: { id: pubbleCategoryId },
    });
    return this.findOne({ id: saved.id });
  }

  async findAll(): Promise<Pubble[]> {
    return await this.pubblesRepository.find({
      order: { created_at: 'DESC' },
      relations: ['pubbleCategory'],
    });
  }

  async findOne({ id }: IPubblesServiceFindOne): Promise<Pubble> {
    const pubble = await this.pubblesRepository.findOne({
      where: { id },
      relations: ['pubbleCategory'],
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
    Object.assign(pubble, updatePubbleInput);
    return this.pubblesRepository.save(pubble);
  }

  async updatePartial({
    id,
    updatePartialPubbleInput,
  }: IPubblesServiceUpdatePartial): Promise<Pubble> {
    const pubble = await this.findOne({ id });
    Object.assign(pubble, updatePartialPubbleInput);
    return await this.pubblesRepository.save(pubble);
  }

  async delete({ id }: IPubblesServiceDelete): Promise<boolean> {
    // 만약 id로 조회한 결과가 없다면 예외 발생
    await this.findOne({ id });
    const result = await this.pubblesRepository.softDelete({ id });
    return result.affected ? true : false;
  }
}
