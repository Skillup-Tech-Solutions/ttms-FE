import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiUrls } from "../api/apiUrl";
import type { ApiResponse } from "../Interface/Custom";
import { useApi } from "../api/apiService";
import { showSuccess } from "../Custom/CustomToast";

export const useGetCities = () => {
  const { callApi } = useApi();
  return useQuery({
    queryKey: ["cityList"],
    queryFn: async () => {
      const response = await callApi(`${apiUrls.city}`, "GET");
      return (response as ApiResponse).data;
    },
    refetchOnWindowFocus: true,
  });
};

export const useCityCreate = () => {
  const queryClient = useQueryClient();
  const { callApi } = useApi();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await callApi(`${apiUrls.city}`, "POST", data);
      return response as ApiResponse;
    },
    onSuccess: () => {
          showSuccess("City Created Successfully");
          queryClient.invalidateQueries({ queryKey: ["cityList"] });
        },
  });
};

export const useUpdateCity = () => {
  const queryClient = useQueryClient();
  const { callApi } = useApi();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await callApi(`${apiUrls.city}/${id}`, "PUT", data);
      return response as ApiResponse;
    },
    onSuccess: () => {
      showSuccess("City updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["cityList"] });
    },
  });
};

export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  const { callApi } = useApi();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await callApi(`${apiUrls.city}/${id}`, "DELETE");
      return response as ApiResponse;
    },
    onSuccess: () => {
      showSuccess("City deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["cityList"] });
    },
  });
};
