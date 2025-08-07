import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { IAuthUser } from 'src/commons/interfaces/context';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  // OAuth로 통일
  // @Post('sign-in')
  // createUser(
  //   @Body() createUserInput: CreateUserInput, //
  // ): Promise<User> {
  //   return this.usersService.create({ createUserInput });
  // }

  @Get('/profile')
  @UseGuards(AuthGuard('access'))
  fetchProfile(
    @Req() req: Request & IAuthUser, //
  ): Promise<User> {
    if (!req.user)
      throw new UnprocessableEntityException('auth exception in fetchProfile');
    return this.usersService.findOne({ id: req.user.id });
  }

  @Patch()
  @UseGuards(AuthGuard('access'))
  updateUser(
    @Req() req: Request & IAuthUser, //
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (!req.user)
      throw new UnprocessableEntityException('auth exception in deleteUser');
    return this.usersService.update({
      updateUserInput,
      id: req.user.id,
    });
  }

  @Delete()
  @UseGuards(AuthGuard('access'))
  deleteUser(
    @Req() req: Request & IAuthUser, //
  ): Promise<boolean> {
    if (!req.user)
      throw new UnprocessableEntityException('auth exception in deleteUser');
    return this.usersService.delete({ id: req.user.id });
  }
}
