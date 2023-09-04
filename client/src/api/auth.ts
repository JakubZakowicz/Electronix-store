import { apiRoutes } from '../routes/apiRoutes';
import { usePost } from '../utils/reactQuery.utils';

export const useSignIn = () => usePost(apiRoutes.signIn);
