import { supabase } from '../components/supabaseConfig';

export class AuthService {
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(`Error al cerrar sesión: ${error.message}`);
      }
      return true;
    } catch (error) {
      console.error('Auth service error during logout:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw new Error(`Error obteniendo sesión: ${error.message}`);
      }
      return data?.session?.user || null;
    } catch (error) {
      console.error('Auth service error getting current user:', error);
      throw error;
    }
  }

  async getUserRole(userId) {
    try {
      const { data, error } = await supabase
        .from('Roles')
        .select('isAdmin')
        .eq('userid', userId)
        .maybeSingle();

      if (error) {
        throw new Error(`Error obteniendo rol: ${error.message}`);
      }

      return data?.isAdmin ? 'admin' : 'user';
    } catch (error) {
      console.error('Auth service error getting user role:', error);
      throw error;
    }
  }
} 