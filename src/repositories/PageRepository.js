import { BaseRepository } from './BaseRepository';
import { supabase } from '../components/supabaseConfig';

export class PageRepository extends BaseRepository {
  constructor() {
    super();
    this.tableName = 'Pages';
  }

  async getAll() {
    const { data, error } = await supabase.from(this.tableName).select('*');
    if (error) {
      throw new Error(`Error fetching pages: ${error.message}`);
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
      throw new Error(`Error fetching page: ${error.message}`);
    }
    return data;
  }

  async create(pageData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([pageData])
      .select();
    
    if (error) {
      throw new Error(`Error creating page: ${error.message}`);
    }
    return data[0];
  }

  async update(id, pageData) {
    const { error } = await supabase
      .from(this.tableName)
      .update(pageData)
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error updating page: ${error.message}`);
    }
    return true;
  }

  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting page: ${error.message}`);
    }
    return true;
  }
} 