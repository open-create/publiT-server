import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOne,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneByUsername,
  IUsersServiceUpdate,
} from './interfaces/users.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ createUserInput }: IUsersServiceCreate): Promise<User> {
    await this.findOneByEmail({ email: createUserInput.email });
    let hashedPassword: string = '';
    if (createUserInput.password)
      hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    return await this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
    });
  }

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

  async findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update({ updateUserInput, id }: IUsersServiceUpdate) {
    const user = await this.findOne({ id });
    Object.assign(user, updateUserInput);
    return this.usersRepository.save(user);
  }

  async delete({ id }: IUsersServiceDelete): Promise<boolean> {
    await this.findOne({ id });
    const result = this.usersRepository.delete({ id });
    return (await result).affected ? true : false;
  }
}
