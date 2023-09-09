import { apiRoutes } from '../routes/apiRoutes';
import { useFetch } from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { Order } from '../utils/types';

export const useGetOrders = (userId?: string) =>
  useFetch<Order[]>(
    userId ? pathToUrl(apiRoutes.getOrders, { userId }) : null,
    {
      withCredentials: true,
    }
  );
