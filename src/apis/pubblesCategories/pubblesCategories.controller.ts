import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PubblesCategoriesService } from './pubblesCategories.service';
import { PubbleCategory } from './entities/pubbleCategory.entity';

@Controller('pubblesCategories')
export class PubblesCategoriesController {
  constructor(
    private readonly pubblesCategoriesService: PubblesCategoriesService, //
  ) {}

  @Post()
  create(@Body('name') name: string): Promise<PubbleCategory> {
    return this.pubblesCategoriesService.create({ name });
  }

  @Get()
  findAll() {
    return this.pubblesCategoriesService.findAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.pubblesCategoriesService.delete({ id });
  }
}
