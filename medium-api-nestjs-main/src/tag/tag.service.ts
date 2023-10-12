import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<{
    tags: Tag['name'][];
  }> {
    const tags = await this.prismaService.tag.findMany({
      select: {
        name: true,
      },
    });

    return {
      tags: tags.map((tag) => tag.name),
    };
  }

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
