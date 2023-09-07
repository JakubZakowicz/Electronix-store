import { apiRoutes } from '../routes/apiRoutes';
import { useFetch, usePost } from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { User } from '../utils/types';

export const useSignIn = () =>
  usePost(apiRoutes.signIn, undefined, { withCredentials: true });

export const useSignUp = () => usePost(apiRoutes.signUp);

export const useSignOut = () =>
  usePost(apiRoutes.signOut, undefined, { withCredentials: true });

export const useGetMe = () =>
  useFetch<{ userId: string }>(apiRoutes.getMe, { withCredentials: true });

export const useGetUser = (userId: string) =>
  useFetch<User>(pathToUrl(apiRoutes.getUser, { userId }), {
    withCredentials: true,
  });
