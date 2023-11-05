import { apiRoutes } from '../routes/apiRoutes';
import { useFetch, usePost } from '../utils/reactQuery.utils';
import { pathToUrl } from '../utils/router.utils';
import { StripeConfig } from '../utils/types';

export const useGetStripeConfig = () =>
  useFetch<StripeConfig>(apiRoutes.getStripeConfig);

export const useMakePayment = () => usePost(apiRoutes.makePayment);

export const useAddNewOrder = (paymentIntentId: string) =>
  usePost(
    pathToUrl(apiRoutes.addNewOrder, {
      payment_intent_id: paymentIntentId,
    }),
    undefined,
    { withCredentials: true }
  );
