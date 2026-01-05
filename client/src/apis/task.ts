import axios from "axios";
import type { ITask } from "../interface/task";
import { API_BASE_URL } from "../api_url";

export const createTask = async (data: Partial<ITask>) => {
  const response = await axios.post(
    `${API_BASE_URL}/tasks/create/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getTasks = async (userId:string) => {
  const response = await axios.get<ITask[]>(
    `${API_BASE_URL}/tasks/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const updateTask = async (id: string, data: Partial<ITask>) => {
  const response = await axios.put(
    `${API_BASE_URL}/tasks/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(
    `${API_BASE_URL}/tasks/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
