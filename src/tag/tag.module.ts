import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from '@app/tag/tag.controller.js';
import { TagService } from '@app/tag/tag.service.js';
import { TagEntity } from '@app/tag/tag.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
