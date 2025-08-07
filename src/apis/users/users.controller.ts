import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/commons/interfaces/context';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Post('sign-in')
  createUser(
    @Body() createUserInput: CreateUserInput, //
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @Get('profile')
  @UseGuards(AuthGuard('access'))
  fetchProfile(
    @Req() context: IRequest, //
  ): Promise<User> {
    if (!context.req.user)
      throw new UnprocessableEntityException('auth exception in fetchProfile');
    return this.usersService.findOne({ id: context.req.user.id });
  }

  @Patch()
  @UseGuards(AuthGuard('access'))
  updateUser(
    @Req() context: IRequest, //
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (!context.req.user)
      throw new UnprocessableEntityException('auth exception in deleteUser');
    return this.usersService.update({
      updateUserInput,
      id: context.req.user.id,
    });
  }

  @Delete()
  deleteUser(
    @Req() context: IRequest, //
  ): Promise<boolean> {
    if (!context.req.user)
      throw new UnprocessableEntityException('auth exception in deleteUser');
    return this.usersService.delete({ id: context.req.user.id });
  }
}
