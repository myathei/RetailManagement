import { Button } from "@/components/ui/button";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  CartType,
  clearCart,
  increaseItem,
  reduceItem,
  removeFromCart,
  selectTotalQuantity,
} from "@/store/features/cartSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowBigLeft, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useToast } from "@/hooks/use-toast";
import { CreateSale } from "@/api/sale-report/type";
import { useEffect, useState } from "react";

const CartView = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (total: number, item: CartType) =>
          total + item.sellingPrice * item.quantity,
        0
      )
    );
  }, [cartItems]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const totalQuantity = useAppSelector(selectTotalQuantity);

  const { mutate: addSale } = api.saleReport.addSale.useMutation();

  const confirm = async () => {
    try {
      const salePayload: CreateSale[] = cartItems.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
      }));

      addSale(salePayload);

      dispatch(clearCart());

      toast({
        title: "Order Confirmed!",
        description: "Your purchase has been successfully processed.",
        variant: "default",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong while confirming the order." + error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center"> Shopping Cart</h2>

      <Button
        onClick={() => navigate("/")}
        variant={"secondary"}
        className="mb-3 text-center bg-gray-300 hover:bg-gray-400"
      >
        <ArrowBigLeft className="w-4 h-4 font-bold" />
      </Button>

      {cartItems.length === 0 ? (
        <div className="text-gray-500 text-center">
          <p>Your cart is empty.</p>
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Browse products.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-md border shadow p-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>

                  <TableHead>Total Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.productID}>
                    <TableCell>{item.productName}</TableCell>

                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => dispatch(reduceItem(item.productID))}
                          >
                            <MinusCircle className="w-4 h-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => dispatch(increaseItem(item))}
                          >
                            <PlusCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.sellingPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {(item.sellingPrice * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => dispatch(removeFromCart(item.productID))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Total & Clear Cart Button */}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="font-bold">
              <p>Total Quantity: {totalQuantity}</p>
              <p>Total Cost: {totalPrice.toFixed(2)}</p>
            </div>
            <Button variant="outline" onClick={confirm}>
              Confirm Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;
