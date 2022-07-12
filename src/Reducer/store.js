import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/productsSlice";
import cartReducer from "./Slices/cartSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});