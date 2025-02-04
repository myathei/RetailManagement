export type APIResponse<T> = {
	message: string
	status: number
	data: T
}

export type ProductType = {
    productID:string,
    productName:string,
    stock:number,
    sellingPrice:number,
    activeFlag: boolean,
    createdDate:Date,
    updateDate:Date,
    createdBy:string,
    updatedBy:string,
    profitPerItem:number
}

export type LanguageType = 'th-TH' | 'en-US'
export type GenderType = 'Male' | 'Female'

export type APIResponse<T> = {
    message: string
    status: number
    data: T
}


