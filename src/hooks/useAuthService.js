import { useState } from 'react';
import { AuthService } from '../services/AuthService';

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authService = new AuthService();

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.logout();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error during logout:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (err) {
      setError(err.message);
      console.error('Error getting current user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserRole = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const role = await authService.getUserRole(userId);
      return role;
    } catch (err) {
      setError(err.message);
      console.error('Error getting user role:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    logout,
    getCurrentUser,
    getUserRole
  };
}; 