import { CreatePubbleInput } from '../dto/create-pubbles.input';

export interface IPubblesServiceCreate {
  createPubbleInput: CreatePubbleInput;
}

export interface IPubblesServiceDelete {
  id: string;
}

export interface IPubblesServiceFindOne {
  id: string;
}
