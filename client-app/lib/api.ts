import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

let accessToken: string | null = null;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          
          const newAccessToken = response.data.accessToken;
          setAccessToken(newAccessToken);
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('refreshToken');
        accessToken = null;
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export interface RegisterData {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    email: string;
    createdAt: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RefreshResponse {
  accessToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
}

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/user/register", data);
  return response.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const refreshTokens = async (refreshToken: string): Promise<RefreshResponse> => {
  const response = await api.post<RefreshResponse>("/auth/refresh", {
    refreshToken,
  });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>("/auth/profile");
  return response.data;
};

export default api;
