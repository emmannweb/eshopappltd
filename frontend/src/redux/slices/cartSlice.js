import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : null,

    itemsPrice: localStorage.getItem("itemsPrice")
      ? JSON.parse(localStorage.getItem("itemsPrice"))
      : 0,

    shippingPrice: localStorage.getItem("itemsPrice")
      ? JSON.parse(localStorage.getItem("itemsPrice")) > 200
        ? 0
        : 25
      : 0,

    taxPrice: 0,

    totalPrice: localStorage.getItem("totalPrice")
      ? JSON.parse(localStorage.getItem("totalPrice"))
      : 0,
  },
  reducers: {
    increaseByQuantity: (state, action) => {
      const item = state.cartItems.find(
        (value) => value.product === action.payload.product,
      );

      if (item.countStock === item?.quantity) {
        return;
      }
      item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      state.itemsPrice = state.cartItems.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0,
      );
      localStorage.setItem("itemsPrice", JSON.stringify(state.itemsPrice));

      state.shippingPrice = state.itemsPrice > 200 ? 0 : 25;

      state.taxPrice = state.itemsPrice * 0.03;

      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    decreaseByQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.product === action.payload,
      );
      item.quantity = item.quantity <= 1 ? 1 : (item.quantity -= 1);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      state.itemsPrice = state.cartItems.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0,
      );
      localStorage.setItem("itemsPrice", JSON.stringify(state.itemsPrice));

      state.shippingPrice = state.itemsPrice > 200 ? 0 : 25;

      state.taxPrice = state.itemsPrice * 0.03;

      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    addToCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.product === action.payload.product,
      );
      if (index >= 0) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      state.itemsPrice = state.cartItems.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0,
      );
      localStorage.setItem("itemsPrice", JSON.stringify(state.itemsPrice));

      state.shippingPrice = state.itemsPrice > 200 ? 0 : 25;

      state.taxPrice = state.itemsPrice * 0.03;

      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      state.itemsPrice = state.cartItems.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0,
      );
      localStorage.setItem("itemsPrice", JSON.stringify(state.itemsPrice));

      state.shippingPrice = localStorage.getItem("itemsPrice")
        ? JSON.parse(localStorage.getItem("itemsPrice")) === 0
          ? 0
          : JSON.parse(localStorage.getItem("itemsPrice")) > 200
            ? 0
            : 25
        : 0;

      state.taxPrice = state.itemsPrice * 0.03;

      state.totalPrice =
        state.itemsPrice + state.shippingPrice + state.taxPrice;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

      toast("Item removed from cart!");
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      state.shippingAddress = null;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress),
      );

      state.itemsPrice = 0;
      localStorage.setItem("itemsPrice", JSON.stringify(state.itemsPrice));

      state.shippingPrice = 0;
      localStorage.setItem(
        "shippingPrice",
        JSON.stringify(state.shippingPrice),
      );

      state.totalPrice = 0;
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress),
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increaseByQuantity,
  decreaseByQuantity,
  incrementByAmount,
  removeItem,
  addToCart,
  clearCart,
  saveShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
