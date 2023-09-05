import { apiRoutes } from '../routes/apiRoutes';
import { useFetch, usePost } from '../utils/reactQuery.utils';

export const useSignIn = () =>
  usePost(apiRoutes.signIn, undefined, { withCredentials: true });

export const useGetMe = () =>
  useFetch(apiRoutes.getMe, { withCredentials: true });
