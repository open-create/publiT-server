import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CreatePubbleInput } from './dto/create-pubbles.input';
import { Pubble } from './entities/pubble.entity';
import { PubblesService } from './pubbles.service';
import { UpdatePartialPubbleInput } from './dto/updatePartial-pubbles.input';
import { UpdatePubbleInput } from './dto/update-pupbbles.input';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from 'src/commons/interfaces/context';
import { PubblesLikesService } from '../pubblesLikes/pubblesLikes.service';

@Controller('pubbles')
export class PubblesController {
  constructor(
    private readonly pubblesService: PubblesService, //
    private readonly pubblesLikesService: PubblesLikesService,
  ) {}

  @Get()
  findAll() {
    return this.pubblesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string, //
  ): Promise<Pubble> {
    return this.pubblesService.findOne({ id });
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  create(
    @Body() createPubbleInput: CreatePubbleInput, //
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException();
    return this.pubblesService.create({ createPubbleInput, id: req.user.id });
  }

  @Put(':id')
  @UseGuards(AuthGuard('access'))
  update(
    @Param('id') id: string, //
    @Body() updatePubbleInput: UpdatePubbleInput,
  ): Promise<Pubble> {
    return this.pubblesService.update({
      id,
      updatePubbleInput,
    });
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updatePartialPubbleInput: UpdatePartialPubbleInput,
  ) {
    return this.pubblesService.updatePartial({ id, updatePartialPubbleInput });
  }

  @Patch(':id/draft')
  @UseGuards(AuthGuard('access'))
  updateSaveDraft(
    @Param('id') id: string, //
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException();
    return this.pubblesService.updateDraft({
      id,
      isDraft: false,
      userId: req.user.id,
    });
  }

  @Patch(':id/draft')
  @UseGuards(AuthGuard('access'))
  updatePublishDraft(
    @Param('id') id: string, //
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException();
    return this.pubblesService.updateDraft({
      id,
      isDraft: true,
      userId: req.user.id,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pubblesService.delete({ id });
  }

  @Post('/:id/like')
  @UseGuards(AuthGuard('access'))
  like(
    @Param('id') id: string, //
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException();
    return this.pubblesLikesService.like({ id, userId: req.user.id });
  }

  @Delete('/:id/like')
  @UseGuards(AuthGuard('access'))
  unlike(
    @Param('id') id: string, //
    @Req() req: Request & IAuthUser,
  ) {
    if (!req.user) throw new UnprocessableEntityException();
    return this.pubblesLikesService.unlike({ id, userId: req.user.id });
  }

  @Get('/:id/like')
  async countLikes(
    @Param('id') id: string, //
  ) {
    return this.pubblesLikesService.countLikes({ id });
  }
}
