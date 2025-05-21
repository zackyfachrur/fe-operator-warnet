import axios from "axios";

export interface Operator {
  id: number;
  username: string;
}

export interface LoginResponse {
  message: string;
  operator: Operator;
}

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    "http://localhost:3000/api/login",
    {
      username,
      password,
    }
  );

  return res.data;
};
