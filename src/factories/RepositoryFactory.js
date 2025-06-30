import { GameRepository } from '../repositories/GameRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { PageRepository } from '../repositories/PageRepository';

export class RepositoryFactory {
  static createRepository(type) {
    switch (type) {
      case 'game':
        return new GameRepository();
      case 'category':
        return new CategoryRepository();
      case 'page':
        return new PageRepository();
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }

  static createRepositories(types) {
    return types.map(type => this.createRepository(type));
  }
} 