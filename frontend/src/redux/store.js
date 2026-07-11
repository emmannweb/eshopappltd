import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/apiSlice";
import authReducer from "./slices/authSlices";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
  devTools: true,
});

export default store;
