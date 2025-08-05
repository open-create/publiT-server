import { PartialType } from '@nestjs/swagger';
import { CreatePubbleInput } from './create-pubbles.input';

export class UpdatePartialPubbleInput extends PartialType(CreatePubbleInput) {}
