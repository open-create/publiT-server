import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pubble } from './entities/pubble.entity';
import {
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
    private readonly postRepository: Repository<Pubble>,
  ) {}

  async create({ createPubbleInput }: IPubblesServiceCreate): Promise<Pubble> {
    const post = this.postRepository.create(createPubbleInput);
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Pubble[]> {
    return await this.postRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne({ id }: IPubblesServiceFindOne): Promise<Pubble> {
    const pubble = await this.postRepository.findOne({ where: { id } });
    if (!pubble) throw new NotFoundException(`Post with ID ${id} not found`);
    return pubble;
  }

  async update({
    id,
    updatePubbleInput,
  }: IPubblesServiceUpdate): Promise<Pubble> {
    const pubble = await this.findOne({ id });
    Object.assign(pubble, updatePubbleInput);
    return this.postRepository.save(pubble);
  }

  async updatePartial({
    id,
    updatePartialPubbleInput,
  }: IPubblesServiceUpdatePartial): Promise<Pubble> {
    const pubble = await this.findOne({ id });
    Object.assign(pubble, updatePartialPubbleInput);
    return await this.postRepository.save(pubble);
  }

  async delete({ id }: IPubblesServiceDelete): Promise<boolean> {
    // 만약 id로 조회한 결과가 없다면 예외 발생
    await this.findOne({ id });
    const result = await this.postRepository.softDelete({ id });
    return result.affected ? true : false;
  }
}
