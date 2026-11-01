import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller.js';
import { ArticleService } from './article.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
