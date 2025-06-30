import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';
import GameForm from './GameForm';
import GameList from './GameList';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import PageForm from './PageForm';
import PageList from './PageList';
import Modal from './Modal';
import { useGameService } from '../../hooks/useGameService';
import { useCategoryService } from '../../hooks/useCategoryService';
import { usePageService } from '../../hooks/usePageService';
import { useAuthService } from '../../hooks/useAuthService';
import styled, { createGlobalStyle } from 'styled-components';

const MainBackground = styled.div`
  min-height: 100vh;
  background: #151f44;
  padding: 0;
  font-family: 'Poppins', sans-serif;
`;

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 0 0;
`;

const Section = styled.div`
  background: #353c5a;
  border-radius: 18px;
  padding: 32px 32px 24px 32px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;

  h1 {
    font-size: 40px;
    color: #e0e0e0;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    margin: 0;
  }

  button {
    background: none;
    color: #fff;
    border: none;
    padding: 10px 24px;
    font-size: 16px;
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    cursor: pointer;
    &:hover {
      background: #232a45;
    }
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 32px;
`;

const FlexCol = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const AddButton = styled.button`
  background: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  cursor: pointer;
  margin-bottom: 24px;
  
  &:hover {
    background: #45a049;
  }
`;

const Games = () => {

  const { 
    games, 
    loading: gamesLoading, 
    error: gamesError,
    deleteGame, 
    updateGame 
  } = useGameService();
  
  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError,
    deleteCategory, 
    updateCategory 
  } = useCategoryService();
  
  const { 
    pages, 
    loading: pagesLoading, 
    error: pagesError,
    deletePage, 
    updatePage 
  } = usePageService();

  const { logout, loading: authLoading, error: authError } = useAuthService();

  const [gameToEdit, setGameToEdit] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [pageToEdit, setPageToEdit] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const navigate = useNavigate();

  // Game handlers
  const handleSaveGame = async (game) => {
    if (!game) {
      console.error('Game object is null or undefined');
      return;
    }

    try {
      if (gameToEdit) {
        await updateGame(gameToEdit.id, game);
        setGameToEdit(null);
      }
      // For new games, the form component handles creation
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleDeleteGame = async (id) => {
    try {
      await deleteGame(id);
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleEditGame = (id) => {
    const game = games.find(g => g.id === id);
    setGameToEdit(game);
    setIsGameModalOpen(true);
  };

  const handleSaveCategory = async (category) => {
    if (!category) {
      console.error('Category object is null or undefined');
      return;
    }

    try {
      if (categoryToEdit) {
        await updateCategory(categoryToEdit.id, category);
        setCategoryToEdit(null);
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = (id) => {
    const category = categories.find(c => c.id === id);
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleSavePage = async (page) => {
    if (!page) {
      console.error('Page object is null or undefined');
      return;
    }

    try {
      if (pageToEdit) {
        await updatePage(pageToEdit.id, page);
        setPageToEdit(null);
      }
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleDeletePage = async (id) => {
    try {
      await deletePage(id);
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleEditPage = (id) => {
    const page = pages.find(p => p.id === id);
    setPageToEdit(page);
    setIsPageModalOpen(true);
  };

  const handleAddGame = () => {
    setGameToEdit(null);
    setIsGameModalOpen(true);
  };

  const handleAddCategory = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  };

  const handleAddPage = () => {
    setPageToEdit(null);
    setIsPageModalOpen(true);
  };

  const handleCloseGameModal = () => {
    setIsGameModalOpen(false);
    setGameToEdit(null);
  };

  const handleCloseCategoryModal = () => {
    setIsCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  const handleClosePageModal = () => {
    setIsPageModalOpen(false);
    setPageToEdit(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const isLoading = gamesLoading || categoriesLoading || pagesLoading || authLoading;

  if (isLoading) {
    return (
      <MainBackground>
        <GlobalStyle />
        <div className="loading-container">
          <div className="loading-spinner">Cargando...</div>
        </div>
      </MainBackground>
    );
  }

  return (
    <MainBackground>
      <GlobalStyle />
      <AdminContainer>
        <Section>
          <Header>
            <h1>Panel de Administración</h1>
            <button onClick={handleLogout} disabled={authLoading}>
              {authLoading ? 'Cerrando...' : 'Cerrar Sesión'}
            </button>
          </Header>
        </Section>

        <Section>
          <SectionTitle>Juegos</SectionTitle>
          <AddButton onClick={handleAddGame}>Agregar Juego</AddButton>
          <GameList 
            games={games} 
            onDelete={handleDeleteGame} 
            onEdit={handleEditGame} 
          />
        </Section>

        <FlexRow>
          <FlexCol>
            <Section>
              <SectionTitle>Categorías</SectionTitle>
              <AddButton onClick={handleAddCategory}>Agregar Categoría</AddButton>
              <CategoryList 
                categories={categories} 
                onDelete={handleDeleteCategory} 
                onEdit={handleEditCategory} 
              />
            </Section>
          </FlexCol>

          <FlexCol>
            <Section>
              <SectionTitle>Páginas</SectionTitle>
              <AddButton onClick={handleAddPage}>Agregar Página</AddButton>
              <PageList 
                pages={pages} 
                onDelete={handleDeletePage} 
                onEdit={handleEditPage} 
              />
            </Section>
          </FlexCol>
        </FlexRow>

        {/* Modals */}
        {isGameModalOpen && (
          <Modal onClose={handleCloseGameModal}>
            <GameForm
              gameToEdit={gameToEdit}
              onSave={handleSaveGame}
              onClose={handleCloseGameModal}
              categories={categories}
              pages={pages}
            />
          </Modal>
        )}

        {isCategoryModalOpen && (
          <Modal onClose={handleCloseCategoryModal}>
            <CategoryForm
              categoryToEdit={categoryToEdit}
              onSave={handleSaveCategory}
              onClose={handleCloseCategoryModal}
            />
          </Modal>
        )}

        {isPageModalOpen && (
          <Modal onClose={handleClosePageModal}>
            <PageForm
              pageToEdit={pageToEdit}
              onSave={handleSavePage}
              onClose={handleClosePageModal}
            />
          </Modal>
        )}
      </AdminContainer>
    </MainBackground>
  );
};

export default Games;
