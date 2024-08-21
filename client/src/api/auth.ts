import { apiRoutes } from '../routes/apiRoutes';
import { useFetch, usePost, useUpdate } from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { EmailConfirmationResult, User } from '../utils/types';

export const useSignIn = () =>
  usePost(apiRoutes.signIn, undefined, { withCredentials: true });

export const useSignUp = () => usePost(apiRoutes.signUp);

export const useSignOut = () =>
  usePost(apiRoutes.signOut, undefined, { withCredentials: true });

export const useGetMe = () =>
  useFetch<{ userId: string }>(
    apiRoutes.getMe,
    { withCredentials: true },
    { retry: 0 }
  );

export const useGetUser = (userId?: string) =>
  useFetch<User>(userId ? pathToUrl(apiRoutes.getUser, { userId }) : null, {
    withCredentials: true,
  });

export const useUpdateUser = (userId?: string) =>
  useUpdate(
    userId ? pathToUrl(apiRoutes.updateUser, { userId }) : null,
    undefined,
    {
      withCredentials: true,
    }
  );

export const useConfirmEmail = (token: string) =>
  useFetch<EmailConfirmationResult>(
    pathToUrl(apiRoutes.confirmEmail, { token })
  );

export const useForgotPassword = () =>
  usePost(apiRoutes.forgotPassword);

export const useResetPassword = () => useUpdate(apiRoutes.resetPassword, undefined, { method: 'PATCH' })
