import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./api";

export const createCategory = async (categoryData) => {
  await axiosInstance.post(
    "/category/create",
    categoryData
  );
};

export const getCategories = async () => {
  const response = await axiosInstance.get(
    "/category/categories"
  );
  return response.data;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (categoryData) => createCategory(categoryData),
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['allCategories'],
    queryFn: getCategories
  })
}