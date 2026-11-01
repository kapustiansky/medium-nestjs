import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service.js';
import { AuthGuard } from '@app/user/guards/auth.guard.js';
import { UserEntity } from '@app/user/user.entity.js';
import { User } from '@app/user/decorators/user.decorator.js';
import { CreateArticleDto } from './dto/createArticle.dto.js';
import { ArticleEntity } from './article.entity.js';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    return this.articleService.createArticle(currentUser, createArticleDto);
  }
}
