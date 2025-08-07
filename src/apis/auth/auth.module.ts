import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtGoogleStrategy } from './strategies/jwt-social-google.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, //
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    UsersService,
  ],
})
export class AuthModule {}
