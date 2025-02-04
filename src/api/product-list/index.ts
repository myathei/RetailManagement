import {
    useQuery,
    useQueryClient,
    type UseQueryOptions,
    useMutation,
    type UseMutationOptions
} from "@tanstack/react-query";
import axios from "axios";
import type { ProductType } from "@/shared/types";
import type { CreateProduct, DeleteProduct } from "./type";

export const GetAllProduct = {
    useQuery: (opt?: Partial<UseQueryOptions<unknown, Error, Array<ProductType>>>, onError?: () => void) => {
        return useQuery({
            queryKey: ["AllProduct"],
            queryFn: async () => {
                try {
                    const response = await axios.get('Product/GetAllProduct');
                    const {data, status} = response.data;

                    if (status !== 0) {
                        onError?.();
                        return new Error("Error While Fetching product");
                    }
                    return data;

                } catch {
                    throw new Error("Error While Fetching product");
                }

            },
            ...opt,


        })
    }
}

export const addProduct = {
    useMutation: (opt?: UseMutationOptions<unknown, Error, CreateProduct, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['addProduct'],
            mutationFn: (payload: CreateProduct) => {
                return axios.post('Product/AddProduct', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['AllProduct']
                }))
            },
            ...opt
        })
    }

}

export const updateProduct= {
    useMutation: (opt?: UseMutationOptions<unknown, Error, ProductType, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['updateProduct'],
            mutationFn: (payload: ProductType) => {
                return axios.post('Product/UpdateProduct', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['AllProduct']
                }))
            },
            ...opt
        })
    }
}

export const deleteProduct= {
    useMutation: (opt?: UseMutationOptions<unknown, Error, DeleteProduct, unknown>) => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationKey: ['DeleteProduct'],
            mutationFn: (payload: DeleteProduct) => {
                return axios.post('Product/DeleteProduct', payload)
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(({
                    queryKey: ['AllProduct']
                }))
            },
            ...opt
        })
    }
}