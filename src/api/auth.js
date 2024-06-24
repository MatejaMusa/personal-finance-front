import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./api";

export const createUser = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/signup",
    userData
  )
  return response.data.data.user;
};

export const loginUser = async (
  userData
) => {
  const response = await axiosInstance.post(
    "/auth/login",
    userData
  )
  console.log(JSON.stringify(response.data.data.user, null,2))

  return response.data.data.user;
};

export function useSignupUser() {
  return useMutation({
    mutationFn: (data) => createUser(data)
  });
}

export function useLoginUser() {
  return useMutation({
    mutationFn: (data) => loginUser(data)
  });
}

