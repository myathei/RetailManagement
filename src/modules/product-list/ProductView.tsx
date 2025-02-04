import { columns} from "./column/columns"
import { DataTable } from "./data-table/DataTable";
import api from "@/api"
import {useToast} from "@/hooks/use-toast.ts";

const ProductView = () => {
  const {toast} = useToast();
  const { data: product, isLoading } = api.product.GetAllProduct.useQuery({
      notifyOnChangeProps: "all"
  }, () => {
      toast({
          title: "Error",
          description: "Error while fetching product",
          variant: "destructive",
      })
  });

    return (
      <>
          <div className="container mx-auto p-5">
            <h1 className="text-center mb-5 text-2xl font-bold">Product List!</h1>
          
            <DataTable columns={columns} data={product} loading = {isLoading}/>
          </div>
      </>
    );
  };
  
  export default ProductView;


  

