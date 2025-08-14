import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleLike } from './entities/pubbleLike.entity';
import { Repository } from 'typeorm';
import {
  IPubblesLikesServiceLike,
  IPubblesLikesServiceUnlike,
} from './interfaces/pubblesLikes.interface';

@Injectable()
export class PubblesLikesService {
  constructor(
    @InjectRepository(PubbleLike)
    private readonly pubblesLikesRepository: Repository<PubbleLike>, //
  ) {}

  async like({ id, userId }: IPubblesLikesServiceLike) {
    const existingLike = await this.pubblesLikesRepository.findOne({
      where: { pubble: { id }, user: { id: userId } },
    });
    if (existingLike) throw new UnprocessableEntityException('aleady liked');
    const newLike = this.pubblesLikesRepository.create({
      pubble: { id },
      user: { id: userId },
    });
    return await this.pubblesLikesRepository.save(newLike);
  }

  async unlike({ id, userId }: IPubblesLikesServiceUnlike) {
    const existingLike = await this.pubblesLikesRepository.findOne({
      where: { pubble: { id }, user: { id: userId } },
    });
    if (!existingLike) throw new UnprocessableEntityException('not liked yet');
    await this.pubblesLikesRepository.remove(existingLike);
  }
}
