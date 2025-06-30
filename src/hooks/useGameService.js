import { useState, useEffect } from 'react';
import { RepositoryFactory } from '../factories/RepositoryFactory';
import { GameService } from '../services/GameService';

export const useGameService = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const gameRepository = RepositoryFactory.createRepository('game');
  const gameService = new GameService(gameRepository);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await gameService.getAllGames();
      setGames(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const createGame = async (gameData) => {
    setLoading(true);
    setError(null);
    try {
      const newGame = await gameService.createGame(gameData);
      setGames(prev => [...prev, newGame]);
      return newGame;
    } catch (err) {
      setError(err.message);
      console.error('Error creating game:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateGame = async (id, gameData) => {
    setLoading(true);
    setError(null);
    try {
      await gameService.updateGame(id, gameData);
      setGames(prev => prev.map(game => 
        game.id === id ? { ...game, ...gameData } : game
      ));
    } catch (err) {
      setError(err.message);
      console.error('Error updating game:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteGame = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await gameService.deleteGame(id);
      setGames(prev => prev.filter(game => game.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting game:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getGameWithPrices = async (gameId) => {
    setLoading(true);
    setError(null);
    try {
      const prices = await gameService.getGameWithPrices(gameId);
      return prices;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching game prices:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    games,
    loading,
    error,
    fetchGames,
    createGame,
    updateGame,
    deleteGame,
    getGameWithPrices
  };
}; 