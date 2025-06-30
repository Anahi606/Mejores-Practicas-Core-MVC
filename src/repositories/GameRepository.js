import { BaseRepository } from './BaseRepository';
import { supabase } from '../components/supabaseConfig';


export class GameRepository extends BaseRepository {
  constructor() {
    super();
    this.tableName = 'Games';
  }

  async getAll() {
    const { data, error } = await supabase.from(this.tableName).select('*');
    if (error) {
      throw new Error(`Error fetching games: ${error.message}`);
    }
    return data;
  }

  async getById(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(`Error fetching game: ${error.message}`);
    }
    return data;
  }

  async create(gameData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([gameData])
      .select();
    
    if (error) {
      throw new Error(`Error creating game: ${error.message}`);
    }
    return data[0];
  }

  async update(id, gameData) {
    const { error } = await supabase
      .from(this.tableName)
      .update(gameData)
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error updating game: ${error.message}`);
    }
    return true;
  }

  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting game: ${error.message}`);
    }
    return true;
  }

  async getGameWithPrices(gameId) {
    const { data, error } = await supabase
      .from('Prices')
      .select('*, page:Pages(*)')
      .eq('gameid', gameId);
    
    if (error) {
      throw new Error(`Error fetching game prices: ${error.message}`);
    }
    return data;
  }
} 