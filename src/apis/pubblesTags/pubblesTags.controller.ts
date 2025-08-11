import { Controller, Get } from '@nestjs/common';
import { PubbleTag } from './entities/pubbleTag.entity';
import { PubblesTagsService } from './pubblesTags.service';

@Controller('pubblesTags')
export class PubblesTagsController {
  constructor(
    private readonly pubblesTagsService: PubblesTagsService, //
  ) {}

  @Get()
  fetchAllTag(): Promise<PubbleTag[]> {
    return this.pubblesTagsService.findAll();
  }
}
