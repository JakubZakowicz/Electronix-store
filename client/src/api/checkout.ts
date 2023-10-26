import { apiRoutes } from "../routes/apiRoutes";
import { useFetch, usePost } from "../utils/reactQuery.utils";
import { StripeConfig } from "../utils/types";

export const useGetStripeConfig = () =>
  useFetch<StripeConfig>(apiRoutes.getStripeConfig);

export const useMakePayment = () => usePost(apiRoutes.makePayment)