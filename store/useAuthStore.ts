import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

export type UserType = 'tenant' | 'visitor' | null;

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  userType: UserType;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setVisitor: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  userType: null,
  hydrated: false,

  // 앱 시작 시 AsyncStorage에서 userType 복원
  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem('userType');
      const userType = (stored as UserType) ?? null;
      set({ userType, hydrated: true });
    } catch {
      set({ hydrated: true });
    }
  },

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 800));
    await AsyncStorage.setItem('userType', 'tenant');
    set({
      isLoading: false,
      isLoggedIn: true,
      userType: 'tenant',
      user: {
        id: '1',
        name: '홍길동',
        email,
        phone: '010-1234-5678',
        companyId: 'comp1',
        companyName: '(주)스타트업코리아',
        role: 'employee',
        isTenantVerified: true,
      },
    });
  },

  setVisitor: () => {
    set({ userType: 'visitor' });
  },

  logout: async () => {
    await AsyncStorage.removeItem('userType');
    set({ user: null, isLoggedIn: false, userType: null });
  },
}));
