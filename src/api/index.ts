// import * as product from "./product-list/queries"
import * as product from "./product-list"
import * as saleReport from "./sale-report/queries"

class API {
	product: typeof product;
	saleReport: typeof saleReport

	constructor() {
		this.product = product;
		this.saleReport = saleReport;
	}
}

const api = new API();

export default api;
