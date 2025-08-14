import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubbleLike } from './entities/pubbleLike.entity';
import { Repository } from 'typeorm';
import {
  IPubblesLikesServiceCountLikes,
  IPubblesLikesServiceLike,
  IPubblesLikesServiceUnlike,
} from './interfaces/pubblesLikes.interface';
import { PubblesService } from '../pubbles/pubbles.service';

@Injectable()
export class PubblesLikesService {
  constructor(
    @InjectRepository(PubbleLike)
    private readonly pubblesLikesRepository: Repository<PubbleLike>, //
    private readonly pubblesService: PubblesService,
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
    // pubble like count
    await this.pubblesService.like({ id });
    return await this.pubblesLikesRepository.save(newLike);
  }

  async unlike({ id, userId }: IPubblesLikesServiceUnlike) {
    const existingLike = await this.pubblesLikesRepository.findOne({
      where: { pubble: { id }, user: { id: userId } },
    });
    if (!existingLike) throw new UnprocessableEntityException('not liked yet');
    // pubble like count
    await this.pubblesService.unlike({ id });
    return await this.pubblesLikesRepository.remove(existingLike);
  }

  async countLikes({ id }: IPubblesLikesServiceCountLikes): Promise<number> {
    return await this.pubblesLikesRepository.count({
      where: { pubble: { id } },
    });
  }
}
