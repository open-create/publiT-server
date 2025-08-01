import { CreatePostsInput } from '../dto/create-posts.input';

export interface IPostsServiceCreate {
  createPostsInput: CreatePostsInput;
}

export interface IPostsServiceDelete {
  id: string;
}
