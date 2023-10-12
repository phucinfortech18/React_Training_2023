import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import slugify from 'slugify';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { Prisma, User } from '@prisma/client';
import { GetArticlesQuery } from 'src/types/article';

@Injectable()
export class ArticleService {
  constructor(private readonly prismaService: PrismaService) {}

  private getSlug(str: string) {
    return slugify(str, { lower: true });
  }

  async getAllArticles(userId: User['id'], query: GetArticlesQuery) {
    const whereQuery: Prisma.ArticleWhereInput = {
      author: {
        //  contains: name of the author : can query multiple authors
        ...(query?.author && {
          username: {
            in: query.author,
          },
        }),
      },
      favoritedBy: {
        ...(query?.favorited && {
          some: {
            username: {
              in: query.favorited,
            },
          },
        }),
      },
    };

    const orderByQuery: Prisma.ArticleOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    const page = +(query?.page || 1);
    const limit = +(query?.limit || 10);
    const skip = (page - 1) * limit;

    const articlesPromise = this.prismaService.article.findMany({
      skip,
      take: limit,
      where: whereQuery,
      orderBy: orderByQuery,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        favoritedBy: {
          select: {
            id: true,
          },
        },
      },
    });

    const countPromise = this.prismaService.article.count({
      where: whereQuery,
      orderBy: orderByQuery,
    });

    const [articles, count] = await Promise.all([
      articlesPromise,
      countPromise,
    ]);

    const articlesWithFavorites = articles.map((article) => {
      const favoritedBy = article.favoritedBy.map((user) => user.id);
      const favoritesCount = favoritedBy.length;

      return {
        ...article,
        favoritedBy: undefined,
        favoritesCount,
        favorited: userId ? favoritedBy.includes(userId) : undefined,
      };
    });

    return { articles: articlesWithFavorites, count };
  }

  async createArticle(userId: string, createArticleDto: CreateArticleDto) {
    const { title, description, body, tagList } = createArticleDto;

    const article = await this.prismaService.article.create({
      data: {
        slug: this.getSlug(title),
        title,
        description,
        body,
        tagList: tagList ?? [],
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return article;
  }

  async findBySlug(slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    return article;
  }

  async deleteArticle(userId: User['id'], slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.authorId !== userId) {
      throw new BadRequestException(
        'You are not authorized to delete this article',
      );
    }

    await this.prismaService.article.delete({
      where: {
        slug,
      },
    });

    return article;
  }

  async updateArticle(
    userId: User['id'],
    slug: string,
    updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.prismaService.article.findUnique({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    if (article.authorId !== userId) {
      throw new BadRequestException(
        'You are not authorized to update this article',
      );
    }

    const updatedArticle = await this.prismaService.article.update({
      where: {
        slug,
      },
      data: {
        ...updateArticleDto,
        ...(updateArticleDto?.title && {
          slug: this.getSlug(updateArticleDto.title),
        }),
      },
    });

    return updatedArticle;
  }

  async favoriteArticle(userId: User['id'], slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: { slug },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.article.update({
      where: { slug },
      data: {
        favoritedBy: {
          connect: {
            id: userId,
          },
        },
        favoritesCount: {
          increment: 1,
        },
      },
    });
  }

  async unfavoriteArticle(userId: User['id'], slug: string) {
    const article = await this.prismaService.article.findUnique({
      where: { slug },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.article.update({
      where: { slug },
      data: {
        favoritedBy: {
          disconnect: {
            id: userId,
          },
        },
        favoritesCount: {
          decrement: 1,
        },
      },
    });
  }

  async getFeed(userId: User['id'], query: any) {
    const follows = await this.prismaService.follow.findMany({
      where: {
        followerId: userId,
      },
    });

    if (follows.length === 0) {
      return { articles: [], count: 0 };
    }

    const followeeIds = follows.map((follow) => follow.followeeId);

    const page = +(query?.page || 1);
    const limit = +(query?.limit || 10);
    const skip = (page - 1) * limit;

    const articlesPromise = this.prismaService.article.findMany({
      skip,
      take: limit,
      where: {
        authorId: { in: followeeIds },
      },
    });

    const countPromise = this.prismaService.article.count({
      where: { authorId: { in: followeeIds } },
    });

    const [articles, count] = await Promise.all([
      articlesPromise,
      countPromise,
    ]);

    return { articles, count };
  }
}
