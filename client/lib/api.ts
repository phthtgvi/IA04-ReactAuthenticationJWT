import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  console.log("API_URL:", API_URL);
  const response = await api.post<RegisterResponse>("/user/register", data);
  return response.data;
};
