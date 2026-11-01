import { Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service.js';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async createArticle() {
    return this.articleService.createArticle();
  }
}
