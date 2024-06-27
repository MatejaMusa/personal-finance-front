import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./api";

export const createAccount = async (accountData) => {
  await axiosInstance.post(
    "/account/create",
    accountData
  );
};

export const getAccounts = async () => {
  const response = await axiosInstance.get(
    "/account/accounts"
  );
  console.log(JSON.stringify(response, null, 2))
  return response.data;
};

// export const getOneAccount = async (id) => {
//     const response = await axiosInstance.get(
//       "/account/accounts",
//       userData
//     );
//     return response.data.data;
//   };

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (accountData) => createAccount(accountData),
  });
};

export const useGetAccounts = () => {
  return useQuery({
    queryKey: ['allAccounts'],
    queryFn: getAccounts
  })
}
