import SaleReportService from './services'
import { APIResponse } from '@/shared/types'
import type {  CreateSale, SaleType, SummaryReportType } from './type'
 import {   useMutation, UseMutationOptions, useQuery,  type UseQueryOptions } from "@tanstack/react-query"
// import axios from 'axios'

export const fetchSaleReport = {
	useQuery: (opt?: UseQueryOptions<SaleType[], Error>) =>
		useQuery<SaleType[], Error>({
			queryKey: ["getAllSale"],
			queryFn: async () => {
				const response: APIResponse<SaleType[]> =
					await SaleReportService.getSaleReport();

				return response.data
			},
			...opt,
		}),
}

export const summaryReport = {
	useQuery: (opt?: UseQueryOptions<SummaryReportType, Error>) =>
		useQuery<SummaryReportType, Error>({
			queryKey: ["getSummaryReport"],
			queryFn: async () => {
				const response: APIResponse<SummaryReportType> =
					await SaleReportService.getSummaryReport();

				return response.data
			},
			...opt,
		}),
}

export const addSale = {
	useMutation: (
	  opt?: UseMutationOptions<void, Error, CreateSale[], unknown> // Expect an array of sales
	) =>
	  useMutation({
		mutationKey: ["addSale"],
		mutationFn: async (payload: CreateSale[]) => {
		  return await SaleReportService.addSale(payload); // Accept array
		},
		...opt,
	  }),
  };
  
