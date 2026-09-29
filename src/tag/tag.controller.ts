import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service.js';
import type { TagEntity } from './tag.entity.js';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}
    @Get()
    async findAll(): Promise<{ tags: TagEntity['name'][] }> {
        const tags =  await this.tagService.findAll();
        return {
            tags: tags.map(tag => tag.name),
        }
    }
}
