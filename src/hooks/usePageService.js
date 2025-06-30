import { useState, useEffect } from 'react';
import { RepositoryFactory } from '../factories/RepositoryFactory';
import { PageService } from '../services/PageService';

export const usePageService = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pageRepository = RepositoryFactory.createRepository('page');
  const pageService = new PageService(pageRepository);

  const fetchPages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pageService.getAllPages();
      setPages(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pages:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (pageData) => {
    setLoading(true);
    setError(null);
    try {
      const newPage = await pageService.createPage(pageData);
      setPages(prev => [...prev, newPage]);
      return newPage;
    } catch (err) {
      setError(err.message);
      console.error('Error creating page:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (id, pageData) => {
    setLoading(true);
    setError(null);
    try {
      await pageService.updatePage(id, pageData);
      setPages(prev => prev.map(page => 
        page.id === id ? { ...page, ...pageData } : page
      ));
    } catch (err) {
      setError(err.message);
      console.error('Error updating page:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await pageService.deletePage(id);
      setPages(prev => prev.filter(page => page.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting page:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    loading,
    error,
    fetchPages,
    createPage,
    updatePage,
    deletePage
  };
}; 