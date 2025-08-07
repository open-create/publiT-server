import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceFindOne {
  id: string;
}

export interface IUsersServiceFindOneByUsername {
  username: string;
}

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUsersServiceDelete {
  id: string;
}

export interface IUsersServiceUpdate {
  updateUserInput: UpdateUserInput;
  id: string;
}
