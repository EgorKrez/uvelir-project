import axios from 'axios';
import { ApiUrl } from './path.utils';

export const axiosInstance = axios.create({
  baseURL: ApiUrl,
});

export const getRequest = async <T>(path: string) => (
  await axiosInstance.get<T>(path)
).data;

export const postRequest = async <TInput, TOutput>(path: string, data: TInput) => (
  await axiosInstance.post<TOutput>(path, data)
).data;

export const putRequest = async <TInput, TOutput>(path: string, data: TInput) => (
  await axiosInstance.put<TOutput>(path, data)
).data;

export const deleteRequest = async (path: string): Promise<void> => {
  await axiosInstance.delete(path);
};