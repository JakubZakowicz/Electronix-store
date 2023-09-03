import { apiRoutes } from '../routes/apiRoutes';
import { useFetch } from '../utils/reactQuery.utils';
import { Order } from '../utils/types';

export const useGetOrders = () => useFetch<Order[]>(apiRoutes.getOrders);
