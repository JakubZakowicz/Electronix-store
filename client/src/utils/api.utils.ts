import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  get: <T>(url: string, params?: object) => axios.get<T>(baseURL + url, params),
  post: <T>(url: string, data: any) => axios.post<T>(baseURL + url, data),
};
