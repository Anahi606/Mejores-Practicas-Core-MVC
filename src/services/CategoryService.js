export class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAllCategories() {
    try {
      return await this.categoryRepository.getAll();
    } catch (error) {
      console.error('Service error fetching categories:', error);
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      return await this.categoryRepository.getById(id);
    } catch (error) {
      console.error('Service error fetching category:', error);
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      if (!categoryData.name) {
        throw new Error('Category name is required');
      }

      return await this.categoryRepository.create(categoryData);
    } catch (error) {
      console.error('Service error creating category:', error);
      throw error;
    }
  }

  async updateCategory(id, categoryData) {
    try {
      if (!categoryData.name) {
        throw new Error('Category name is required');
      }

      return await this.categoryRepository.update(id, categoryData);
    } catch (error) {
      console.error('Service error updating category:', error);
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      console.error('Service error deleting category:', error);
      throw error;
    }
  }
} 