import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(baseURL + url, { ...params }),
  post: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    axios.post<T>(baseURL + url, data, config),
  patch: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    axios.patch<T>(baseURL + url, data, config),
  delete: <T>(url: string) => axios.delete<T>(baseURL + url),
};
