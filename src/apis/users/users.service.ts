import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUsersServiceFindOne,
  IUsersServiceFindOneByUsername,
} from './interfaces/users.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne({ id }: IUsersServiceFindOne): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new UnprocessableEntityException(`there is no user with id: ${id}`);
    return user;
  }

  async findOneByUsername({ username }: IUsersServiceFindOneByUsername) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user)
      throw new UnprocessableEntityException(
        `there is no user with username: ${username}`,
      );
    return user;
  }
}
