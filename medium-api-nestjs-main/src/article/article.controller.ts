import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User as UserType } from '@prisma/client';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ArticleService } from './article.service';
import {
  type CreateArticleDto,
  type UpdateArticleDto,
  createArticleSchema,
  updateArticleSchema,
} from './dto';
import { GetArticlesQuery } from 'src/types/article';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(createArticleSchema))
  async create(
    @Body() createArticleDto: CreateArticleDto,
    @User() user: UserType,
  ) {
    return this.articleService.createArticle(user.id, createArticleDto);
  }

  @Get()
  async getAllArticles(
    @Query() query: GetArticlesQuery,
    @User('id') userId: UserType['id'],
  ) {
    return this.articleService.getAllArticles(userId, query);
  }

  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(@User('id') userId: UserType['id'], @Query() query: any) {
    return this.articleService.getFeed(userId, query);
  }

  @Get(':slug')
  async getSingleArticle(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@Param('slug') slug: string, @User() user: UserType) {
    return this.articleService.deleteArticle(user.id, slug);
  }

  @Patch(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(updateArticleSchema))
  async updateArticle(
    @Param('slug') slug: string,
    @Body() createArticleDto: UpdateArticleDto,
    @User() user: UserType,
  ) {
    return this.articleService.updateArticle(user.id, slug, createArticleDto);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async favoriteArticle(
    @Param('slug') slug: string,
    @User('id') userId: UserType['id'],
  ) {
    await this.articleService.favoriteArticle(userId, slug);
    return { success: true, message: 'Article favorited successfully' };
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async unfavoriteArticle(
    @Param('slug') slug: string,
    @User('id') userId: UserType['id'],
  ) {
    await this.articleService.unfavoriteArticle(userId, slug);
    return { success: true, message: 'Article unfavorited successfully' };
  }
}
