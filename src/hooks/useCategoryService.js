import { useState, useEffect } from 'react';
import { RepositoryFactory } from '../factories/RepositoryFactory';
import { CategoryService } from '../services/CategoryService';

export const useCategoryService = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categoryRepository = RepositoryFactory.createRepository('category');
  const categoryService = new CategoryService(categoryRepository);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err.message);
      console.error('Error creating category:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.updateCategory(id, categoryData);
      setCategories(prev => prev.map(category => 
        category.id === id ? { ...category, ...categoryData } : category
      ));
    } catch (err) {
      setError(err.message);
      console.error('Error updating category:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting category:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
}; 