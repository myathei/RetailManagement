import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
import cartSlice  from "./cartSlice";

export const rootReducer
    = combineReducers({
    loader: LoaderSlice,
    cart: cartSlice,
})