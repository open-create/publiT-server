import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePubbleInput } from './dto/create-pubbles.input';
import { Pubble } from './entities/pubble.entity';
import { PubblesService } from './pubbles.service';
import { UpdatePartialPubbleInput } from './dto/updatePartial-pubbles.input';
import { UpdatePubbleInput } from './dto/update-pupbbles.input';

@Controller('pubbles')
export class PubblesController {
  constructor(
    private readonly pubblesService: PubblesService, //
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
  create(
    @Body() createPubbleInput: CreatePubbleInput, //
  ) {
    return this.pubblesService.create({ createPubbleInput });
  }

  @Put(':id')
  update(
    @Param('id') id: string, //
    @Body() updatePubbleInput: UpdatePubbleInput,
  ): Promise<Pubble> {
    return this.pubblesService.update({ id, updatePubbleInput });
  }

  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() updatePartialPubbleInput: UpdatePartialPubbleInput,
  ) {
    return this.pubblesService.updatePartial({ id, updatePartialPubbleInput });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pubblesService.delete({ id });
  }
}
