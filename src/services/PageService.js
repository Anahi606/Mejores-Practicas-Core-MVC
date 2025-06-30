export class PageService {
  constructor(pageRepository) {
    this.pageRepository = pageRepository;
  }

  async getAllPages() {
    try {
      return await this.pageRepository.getAll();
    } catch (error) {
      console.error('Service error fetching pages:', error);
      throw error;
    }
  }

  async getPageById(id) {
    try {
      return await this.pageRepository.getById(id);
    } catch (error) {
      console.error('Service error fetching page:', error);
      throw error;
    }
  }

  async createPage(pageData) {
    try {
      if (!pageData.name || !pageData.url) {
        throw new Error('Page name and URL are required');
      }

      try {
        new URL(pageData.url);
      } catch {
        throw new Error('Invalid URL format');
      }

      return await this.pageRepository.create(pageData);
    } catch (error) {
      console.error('Service error creating page:', error);
      throw error;
    }
  }

  async updatePage(id, pageData) {
    try {
      if (pageData.url) {
        try {
          new URL(pageData.url);
        } catch {
          throw new Error('Invalid URL format');
        }
      }

      return await this.pageRepository.update(id, pageData);
    } catch (error) {
      console.error('Service error updating page:', error);
      throw error;
    }
  }

  async deletePage(id) {
    try {
      return await this.pageRepository.delete(id);
    } catch (error) {
      console.error('Service error deleting page:', error);
      throw error;
    }
  }
} 