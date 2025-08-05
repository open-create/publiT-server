import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePubbleInput } from './dto/create-pubbles.input';
import { Pubble } from './entities/pubble.entity';
import { PubblesService } from './pubbles.service';

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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pubblesService.delete({ id });
  }

  @Put(':id')
  updateAll(): string {
    return this.pubblesService.update();
  }

  updatePartial() {}
}
