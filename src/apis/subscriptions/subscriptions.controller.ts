import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from 'src/commons/interfaces/context';
import { Request } from 'express';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService, //
  ) {}

  @Post('/:targetId')
  @UseGuards(AuthGuard('access'))
  createSubscription(
    @Req() req: Request & IAuthUser,
    @Param('targetId') targetId: string,
  ) {
    if (!req.user)
      throw new UnprocessableEntityException('User not authenticated');
    return this.subscriptionsService.create({
      subscriberId: req.user.id,
      targetId,
    });
  }

  @Delete('/:targetId')
  @UseGuards(AuthGuard('access'))
  deleteSubscription(
    @Req() req: Request & IAuthUser,
    @Param('targetId') targetId: string,
  ) {
    if (!req.user)
      throw new UnprocessableEntityException('User not authenticated');
    return this.subscriptionsService.delete({
      subscriberId: req.user.id,
      targetId,
    });
  }
}
