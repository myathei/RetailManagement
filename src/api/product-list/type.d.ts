export type CreateProduct = {
    productName:string,
    stock:number,
    sellingPrice:number,
    profitPerItem:number
}

export type DeleteProduct = {
    productID: string,
}