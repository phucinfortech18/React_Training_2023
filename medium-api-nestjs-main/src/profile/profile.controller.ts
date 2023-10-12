import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { User } from 'src/user/decorators/user.decorator';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') userId: UserType['id'],
    @Param('username') username: UserType['username'],
  ) {
    return this.profileService.getProfile(userId, username);
  }

  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followUser(
    @User('id') userId: UserType['id'],
    @Param('username') username: UserType['username'],
  ) {
    return this.profileService.followProfile(userId, username);
  }

  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unfollowUser(
    @User('id') userId: UserType['id'],
    @Param('username') username: UserType['username'],
  ) {
    return this.profileService.unfollowProfile(userId, username);
  }
}
