import { BaseRepository } from './BaseRepository';
import { supabase } from '../components/supabaseConfig';

export class CategoryRepository extends BaseRepository {
  constructor() {
    super();
    this.tableName = 'Category';
  }

  async getAll() {
    const { data, error } = await supabase.from(this.tableName).select('*');
    if (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
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
      throw new Error(`Error fetching category: ${error.message}`);
    }
    return data;
  }

  async create(categoryData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([categoryData])
      .select();
    
    if (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
    return data[0];
  }

  async update(id, categoryData) {
    const { error } = await supabase
      .from(this.tableName)
      .update(categoryData)
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
    return true;
  }

  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
    return true;
  }
} 