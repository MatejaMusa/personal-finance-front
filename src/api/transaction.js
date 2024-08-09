import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./api";

export const createTransaction = async (transactiontData) => {
  await axiosInstance.post("/transaction/create", transactiontData);
};

export const getTransactions = async ({ accountId, page = 0, size = 10 }) => {
  const response = await axiosInstance.get(
    `/transaction/transactions/${accountId}?page=${page}&size=${size}`
  );
  return response.data;
};

export const correctTransaction = async (id) => {
  await axiosInstance.post(`/transaction/correct/${id}`);
};

export const getGraphs = async ({ accountId }) => {
  const response = await axiosInstance.get(`/transaction/graphs/${accountId}`);
  return response.data;
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transactiontData) => createTransaction(transactiontData),
    onSuccess: () => {
      queryClient.invalidateQueries(['allTransactions']);
      queryClient.invalidateQueries(['getGraphs']);
    },
  });
};

export const useGetTransactions = ({ accountId, page, size }) => {
  return useQuery({
    queryKey: ["allTransactions", accountId, page, size],
    queryFn: () => getTransactions({ accountId, page, size }),
  });
};

export const useGetGraphs = ({ accountId }) => {
  return useQuery({
    queryKey: ["getGraphs", accountId],
    queryFn: () => getGraphs({ accountId }),
  });
};

export const useCorrectTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => correctTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['allTransactions']);
      queryClient.invalidateQueries(['getGraphs']);
    },
  });
};
