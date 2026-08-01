import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryKey,
  type UseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query'
import { api } from '@/lib/api-client'

interface ListParams {
  page?: number
  pageSize?: number
  search?: string
  [key: string]: unknown
}

interface ListResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export function useApiQuery<T>(
  key: QueryKey,
  path: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: ({ signal }) => api.get<T>(path, signal),
    ...options,
  })
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export function useMockableQuery<T>(
  key: QueryKey,
  mock: T,
  fetcher: (signal?: AbortSignal) => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T, Error, T, QueryKey>({
    queryKey: key,
    queryFn: ({ signal }) => (USE_MOCK ? Promise.resolve(mock) : fetcher(signal)),
    placeholderData: USE_MOCK ? (mock as never) : undefined,
    ...options,
  })
}

export function useApiListQuery<T>(
  key: QueryKey,
  path: string,
  params: ListParams = {},
  options?: Omit<UseQueryOptions<ListResponse<T>, Error>, 'queryKey' | 'queryFn'>,
) {
  const searchParams = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '' && v !== null) searchParams.set(k, String(v))
  }
  const query = searchParams.toString()
  const fullPath = query ? `${path}?${query}` : path

  return useQuery<ListResponse<T>, Error>({
    queryKey: [...key, params],
    queryFn: ({ signal }) => api.get<ListResponse<T>>(fullPath, signal),
    ...options,
  })
}

export function useApiMutation<TData, TVariables>(
  path: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: UseMutationOptions<TData, Error, TVariables>,
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables) => {
      if (method === 'POST') return api.post<TData>(path, variables)
      if (method === 'PUT') return api.put<TData>(path, variables)
      if (method === 'PATCH') return api.patch<TData>(path, variables)
      return api.delete<TData>(path)
    },
    ...options,
  })
}

export function useInvalidateQueries() {
  const queryClient = useQueryClient()
  return (keys: QueryKey[]) => keys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }))
}

export { useQueryClient, useQuery }
