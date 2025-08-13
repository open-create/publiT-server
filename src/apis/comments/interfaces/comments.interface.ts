import { CreateCommentsInput } from '../dto/create-comments.input';

export interface ICommentsServiceFindByPubbleId {
  pubbleId: string;
}

export interface ICommentsServiceFindOne {
  id: string;
}

export interface ICommentsServiceDelete {
  id: string;
}

export interface ICommentsServiceCreate {
  createCommentsInput: CreateCommentsInput;
  authorId: string;
}

export interface ICommentsServiceUpdate {
  id: string;
  content: string;
  authorId: string;
}
