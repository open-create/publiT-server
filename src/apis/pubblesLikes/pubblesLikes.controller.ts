import { Controller } from '@nestjs/common';
import { PubblesLikesService } from './pubblesLikes.service';

@Controller('pubblesLikes')
export class PubblesLikesController {
  constructor(
    private readonly pubblesLikesService: PubblesLikesService, //
  ) {}
}
