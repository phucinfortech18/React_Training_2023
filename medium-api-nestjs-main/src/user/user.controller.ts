import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { type User as UserType } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { User } from './decorators/user.decorator';
import {
  createUserSchema,
  loginUserSchema,
  type CreateUserDto,
  type LoginUserDto,
  UpdateUserDto,
  updateUserSchema,
} from './dto';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('users/me')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserType) {
    const response = this.userService.buildUserResponse(user);
    Object.assign(response, { token: undefined });
    return response;
  }

  @Patch('users/me')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async updateCurrentUser(
    @User() currentUser: UserType,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateCurrentUser(
      currentUser.id,
      updateUserDto,
    );

    const response = this.userService.buildUserResponse(user);
    Object.assign(response, { token: undefined });
    return response;
  }
}
