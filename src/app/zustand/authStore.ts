import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const URL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.baseURL = URL;

const setAuthHeader = (token: string | null) => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
};

interface User {
  name: string;
  email: string;
}

interface SignupResponse {
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;

  signup: (name: string, email: string, password: string) => Promise<void>;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      isLoggedIn: false,

      signup: async (name, email, password) => {
        set({ loading: true, error: null });

        try {
          const response = await axios.post<SignupResponse>("/users/signup", {
            name,
            email,
            password,
          });

          const { name: resName, email: resEmail, token } = response.data;
          const user = { name: resName, email: resEmail };

          setAuthHeader(token);
          set({ user, token, loading: false, isLoggedIn: true });
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            set({ error: "Such email already exists", loading: false });
          } else {
            set({ error: "Signup failed, please try again", loading: false });
          }
        }
      },

      setUser: (user, token) => {
        setAuthHeader(token);
        set({ user, token, isLoggedIn: Boolean(token) });
      },

      logout: () => {
        setAuthHeader(null);
        set({ user: null, token: null, isLoggedIn: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
