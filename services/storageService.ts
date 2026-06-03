
import { UserProfile, ChatMessage, Notification, SearchHistoryItem } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const STORAGE_KEYS = {
  USER: 'civic_user',
  TOKEN: 'civic_token',
};

const getAuthHeader = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const storageService = {
  // User Authentication
  getUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  login: async (email: string, password: string): Promise<{ user: UserProfile, token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    const data = await response.json();
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    return data;
  },

  register: async (userData: any): Promise<{ user: UserProfile, token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    const data = await response.json();
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    return data;
  },

  setUser: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  updateProfile: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    const user = await response.json();
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // History
  getHistory: async (): Promise<SearchHistoryItem[]> => {
    const response = await fetch(`${API_BASE_URL}/history`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) return [];
    return response.json();
  },

  addHistory: async (item: Partial<SearchHistoryItem>) => {
    await fetch(`${API_BASE_URL}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(item),
    });
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) return [];
    return response.json();
  },

  markNotificationRead: async (id: string) => {
    await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeader(),
    });
  },

  // Saved Schemes
  getSavedSchemes: async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/saved-schemes`, {
      headers: getAuthHeader(),
    });
    if (!response.ok) return [];
    return response.json();
  },

  toggleSaveScheme: async (schemeId: string): Promise<{ saved: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/saved-schemes/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ schemeId }),
    });
    return response.json();
  }
};
