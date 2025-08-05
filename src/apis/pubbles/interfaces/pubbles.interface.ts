import { CreatePubbleInput } from '../dto/create-pubbles.input';
import { UpdatePubbleInput } from '../dto/update-pupbbles.input';
import { UpdatePartialPubbleInput } from '../dto/updatePartial-pubbles.input';

export interface IPubblesServiceCreate {
  createPubbleInput: CreatePubbleInput;
}

export interface IPubblesServiceDelete {
  id: string;
}

export interface IPubblesServiceFindOne {
  id: string;
}

export interface IPubblesServiceUpdate {
  id: string;
  updatePubbleInput: UpdatePubbleInput;
}

export interface IPubblesServiceUpdatePartial {
  id: string;
  updatePartialPubbleInput: UpdatePartialPubbleInput;
}
