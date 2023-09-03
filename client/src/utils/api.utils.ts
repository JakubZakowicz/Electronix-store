import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  get: <T>(url: string, params?: object) => axios.get<T>(baseURL + url, params),
  post: <T>(url: string, data: any) => axios.post<T>(baseURL + url, data),
  patch: <T>(url: string, data: any) => axios.patch<T>(baseURL + url, data),
  delete: <T>(url: string) => axios.delete<T>(baseURL + url)
};
