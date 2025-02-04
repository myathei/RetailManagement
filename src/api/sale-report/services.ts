import axios from "axios"
import type { SaleType,CreateSale, SummaryReportType } from "./type"
import { APIResponse } from "@/shared/types"

const baseUrl = "/Manager"

const getSaleReport = async (): Promise<APIResponse<SaleType[]>> => {
	const response = await axios.get<APIResponse<SaleType[]>>(
		`${baseUrl}/GetSaleReport`
	)

	return response.data
}

const getSummaryReport = async (): Promise<APIResponse<SummaryReportType>> => {
	const response = await axios.get<APIResponse<SummaryReportType>>(
		`${baseUrl}/GetTotalSummary`
	)

	return response.data
}

const addSale = async (payload: CreateSale[]) => {
    const response = await axios.post(`Cart/AddToCart`, payload)

    return response.data
}

export default { getSaleReport, addSale, getSummaryReport }