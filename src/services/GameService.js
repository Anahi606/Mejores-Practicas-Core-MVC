export class GameService {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  async getAllGames() {
    try {
      return await this.gameRepository.getAll();
    } catch (error) {
      console.error('Service error fetching games:', error);
      throw error;
    }
  }

  async getGameById(id) {
    try {
      return await this.gameRepository.getById(id);
    } catch (error) {
      console.error('Service error fetching game:', error);
      throw error;
    }
  }

  async createGame(gameData) {
    try {
      if (!gameData.title || !gameData.description) {
        throw new Error('Title and description are required');
      }

      if (gameData.rating && (gameData.rating < 0 || gameData.rating > 5)) {
        throw new Error('Rating must be between 0 and 5');
      }

      return await this.gameRepository.create(gameData);
    } catch (error) {
      console.error('Service error creating game:', error);
      throw error;
    }
  }

  async updateGame(id, gameData) {
    try {
      if (gameData.rating && (gameData.rating < 0 || gameData.rating > 5)) {
        throw new Error('Rating must be between 0 and 5');
      }

      return await this.gameRepository.update(id, gameData);
    } catch (error) {
      console.error('Service error updating game:', error);
      throw error;
    }
  }

  async deleteGame(id) {
    try {
      return await this.gameRepository.delete(id);
    } catch (error) {
      console.error('Service error deleting game:', error);
      throw error;
    }
  }

  async getGameWithPrices(gameId) {
    try {
      return await this.gameRepository.getGameWithPrices(gameId);
    } catch (error) {
      console.error('Service error fetching game prices:', error);
      throw error;
    }
  }
} 