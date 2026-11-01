import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  async createArticle(): Promise<any> {
    return {
      article: {
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'You have to believe',
        tagList: ['reactjs', 'angularjs', 'dragons'],
      },
    };
  }
}
