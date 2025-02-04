import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/shared/types";
import { toast } from "@/hooks/use-toast";
import { RootState } from "..";

export interface CartType {
  productID: string;
  productName: string;
  quantity: number;
  stock: number;
  sellingPrice: number;
}

// Define the initial state
interface CartState {
  cartItems: CartType[];
}

const initialState: CartState = {
  cartItems: [],
};

export const selectTotalQuantity = (state: RootState): number => {
  return state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Create the slice
export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productID === product.productID
      );

      if (existingItem && existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else if (existingItem?.quantity === product.stock) {
        toast({
          title: "Stock Limit Reached",
          description: "You have reached the stock limit for this product",
          variant: "destructive",
          duration: 1000,
        });
        return;
      } else {
        const cartItem: CartType = {
          ...product, // Spread the properties of ProductType
          quantity: 1, // Add the quantity field
        };
        state.cartItems.push(cartItem);
      }
      toast({
        title: "Success",
        description: "Product added to cart",
        duration: 1000,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productID !== action.payload
      );
    },
    increaseItem: (state, action: PayloadAction<CartType>) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productID === product.productID
      );

      if (existingItem && existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else {
        toast({
          title: "Stock Limit Reached",
          description: "You cannot add more than the available stock.",
          variant: "destructive",
          duration: 1000,
        });
        return;
      }
    },
    reduceItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productID === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }else {
        state.cartItems = state.cartItems.filter(
          (item) => item.productID !== action.payload
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export the actions
export const {
  clearCart,
  addToCart,
  removeFromCart,
  reduceItem,
  increaseItem,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
