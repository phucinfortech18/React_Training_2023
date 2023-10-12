import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: User['id'], username: User['username']) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        bio: true,
        image: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { ...user, following: false };
  }

  async followProfile(userId: User['id'], username: User['username']) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        bio: true,
        image: true,
      },
    });

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (foundUser.id === userId) {
      throw new HttpException(
        'Follower and following user cannot be the same',
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.prismaService.follow.findFirst({
      where: {
        followeeId: foundUser.id,
        followerId: userId,
      },
    });

    if (follow) {
      throw new HttpException('User already following', HttpStatus.BAD_REQUEST);
    }

    await this.prismaService.follow.create({
      data: {
        followeeId: foundUser.id,
        followerId: userId,
      },
    });

    return { ...foundUser, following: true };
  }

  async unfollowProfile(userId: User['id'], username: User['username']) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        bio: true,
        image: true,
      },
    });

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (foundUser.id === userId) {
      throw new HttpException(
        'Follower and following user cannot be the same',
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.prismaService.follow.findFirst({
      where: {
        followeeId: foundUser.id,
        followerId: userId,
      },
    });

    if (!follow) {
      throw new HttpException('User not following', HttpStatus.BAD_REQUEST);
    }

    await this.prismaService.follow.delete({
      where: {
        id: follow.id,
      },
    });

    return { ...foundUser, following: false };
  }
}
