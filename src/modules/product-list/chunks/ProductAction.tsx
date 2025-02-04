import ProductCreateUpdateDialog from "../chunks/ProductDialog";
import CompleteProduct from "./DeleteProduct";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { addToCart, reduceItem } from "@/store/features/cartSlice";
import { Edit, MinusIcon, Plus, Trash2 } from "lucide-react";
import { ProductType } from "@/shared/types";
import { Button } from "@/components/ui/button";

const ProductActions = ({ product }: { product: ProductType }) => {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  return (
    <div className="text-left flex gap-2 items-center">
      {!cartItems.find((item) => item.productID === product.productID) ? (
        <Button
          className="bg-pink-500 hover:bg-pink-600 rounded-md p-2 px-4"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      ) : (
        <div className="flex items-center">
          <span
            className="rounded-md px-1 font-semibold text-red-500 cursor-pointer hover:bg-gray-200 select-none"
            onClick={() => dispatch(reduceItem(product.productID))}
          >
            <MinusIcon />
          </span>
          <span className="w-[30px] text-black font-bold text-center">
            {
              cartItems.find((item) => item.productID === product.productID)
                ?.quantity
            }
          </span>
          <span
             className="rounded-md px-1 font-semibold text-black-500 cursor-pointer hover:bg-gray-200 select-none"
            onClick={() => dispatch(addToCart(product))}
          >
            <Plus />
          </span>
        </div>
      )}

      {/* Edit Button with Product Dialog */}
      <ProductCreateUpdateDialog isEdit={true} editProduct={product}>
        <Button variant="outline" className="bg-teal-200 hover:bg-teal-400">
          <Edit className="w-4 h-4" />
        </Button>
      </ProductCreateUpdateDialog>

      {/* Delete Product */}
      <CompleteProduct product={product}>
        <Button className="bg-red-500 hover:bg-red-600">
          <Trash2 className="w-4 h-4" />
        </Button>
      </CompleteProduct>
    </div>
  );
};

export default ProductActions;
