import { columns} from "./column/columns"
import { DataTable } from "@/components/table/TableUI";
import api from "@/api"

const SaleReportView = () => {
    const { data: product, isLoading } = api.saleReport.fetchSaleReport.useQuery();
  
    return (
      <>
          <div className="container mx-auto p-5">
            <h1 className="text-center mb-5 text-2xl font-bold">Sale Report List!</h1>
            <DataTable columns={columns} data={product} loading = {isLoading}/>
          </div>
      </>
    );
  };
  
  export default SaleReportView;


  

