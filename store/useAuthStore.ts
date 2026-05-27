import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 800));
    set({
      isLoading: false,
      isLoggedIn: true,
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

  logout: () => set({ user: null, isLoggedIn: false }),
}));
