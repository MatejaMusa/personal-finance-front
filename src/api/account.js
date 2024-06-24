// import { UseMutationResult, useMutation } from "@tanstack/react-query";
// import { axiosInstance } from "./api";

// export const createAccount = async (accountData) => {
//   await axiosInstance.post(
//     "/account/create",
//     accountData
//   );
// };

// export const getAccounts = async () => {
//   const response = await axiosInstance.get(
//     "/account/accounts",
//     userData
//   );
//   return response.data.data;
// };

// export const getOneAccount = async (id) => {
//     const response = await axiosInstance.get(
//       "/account/accounts",
//       userData
//     );
//     return response.data.data;
//   };

// export const useCreateAccount = () => {
//   return useMutation({
//     mutationFn: createUser,
//   });
// };

// export const useLoginUser = ()=> {
//   return useMutation({
//     mutationFn: loginUser,
//   });
// };
