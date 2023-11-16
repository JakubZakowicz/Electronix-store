import {
  QueryFunctionContext,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from './api.utils';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

type QueryKeyT = [string, AxiosRequestConfig | undefined];
type QueryError = AxiosError & { response: { data: { message: string } } }

export const fetcher = <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, reqConfig] = queryKey;
  return api
    .get<T>(url, { ...reqConfig, params: { ...reqConfig?.params, pageParam } })
    .then((res) => res.data);
};

export const useFetch = <T>(
  url: string | null,
  reqConfig?: AxiosRequestConfig,
  config?: UseQueryOptions<T, AxiosError, T, QueryKeyT>
) => {
  const context = useQuery<T, AxiosError, T, QueryKeyT>({
    queryKey: [url!, reqConfig],
    queryFn: ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    enabled: !!url,
    ...config,
  });

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse,
    QueryError,
    T | S
  >({
    mutationFn: func,
    onMutate: async (data) => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const usePost = <T, S>(
  url: string | null,
  params?: object,
  config?: AxiosRequestConfig,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url!, data, config),
    url!,
    params,
    updater
  );
};

export const useUpdate = <T, S>(
  url: string | null,
  params?: object,
  config?: AxiosRequestConfig,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url!, data, config),
    url!,
    params,
    updater
  );
};

export const useDelete = <T>(
  url: string,
  params?: object,
  config?: AxiosRequestConfig,
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`, config),
    url,
    params,
    updater
  );
};
