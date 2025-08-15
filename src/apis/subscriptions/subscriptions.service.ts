import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISubscriptionsServiceCreate } from './interfaces/subscriptions.interface';
import { UsersService } from '../users/users.service';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    private readonly usersService: UsersService,
  ) {}

  async create({ subscriberId, targetId }: ISubscriptionsServiceCreate) {
    const subscriber = await this.usersService.findOne({ id: subscriberId });
    const target = await this.usersService.findOne({ id: targetId });
    if (!subscriber || !target) {
      throw new UnprocessableEntityException('Invalid subscriber or target');
    }
    const subscription = this.subscriptionsRepository.create({
      subscriber,
      target,
    });
    return this.subscriptionsRepository.save(subscription);
  }

  async delete({ subscriberId, targetId }: ISubscriptionsServiceCreate) {
    const subscriber = await this.usersService.findOne({ id: subscriberId });
    const target = await this.usersService.findOne({ id: targetId });
    if (!subscriber || !target) {
      throw new UnprocessableEntityException('Invalid subscriber or target');
    }
    return this.subscriptionsRepository.delete({
      subscriber,
      target,
    });
  }
}
