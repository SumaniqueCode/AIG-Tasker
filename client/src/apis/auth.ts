import axios from "axios";
import { API_BASE_URL } from "../api_url";
import type { LoginUserData, RegisterUserData } from "../interface/auth";

export const registerUser = async (data: RegisterUserData) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/register`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const loginUser = async (data: LoginUserData) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};