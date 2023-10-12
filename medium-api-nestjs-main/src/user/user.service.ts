import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  type UpdateUserDto,
  type CreateUserDto,
  type LoginUserDto,
} from './dto';
import { comparePassword, generateJwt, hashPassword } from './utils/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    const userByEmail = await this.prismaService.user.findUnique({
      where: { email },
    });

    const userByUsername = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.prismaService.user.create({
      data: { email, password: await hashPassword(password), username },
    });
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.buildUserResponse(user);
  }

  async findUserById(userId: User['id']) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateCurrentUser(userId: User['id'], updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const { email, username, bio, image } = updateUserDto;

    if (email && email !== user.email) {
      const userByEmail = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (userByEmail && userByEmail.id !== userId) {
        throw new HttpException(
          'User already exists',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    if (username && username !== user.username) {
      const userByUsername = await this.prismaService.user.findUnique({
        where: { username },
      });

      if (userByUsername && userByUsername.id !== userId) {
        throw new HttpException(
          'User already exists',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...(email && { email }),
        ...(username && { username }),
        ...(bio && { bio }),
        ...(image && { image }),
      },
    });

    return updatedUser;
  }

  buildUserResponse(user: User): User & { token: string } {
    // delete user.password;
    Object.assign(user, { password: undefined });
    return {
      ...user,
      token: generateJwt(user),
    };
  }
}
