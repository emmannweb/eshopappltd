import { ORDERS_URL } from "../constants/constants";
import { api } from "./apiSlice";

export const orderApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: order,
      }),
    }),

    myOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/me`,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),

    summary: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/summary`,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useMyOrdersQuery, useSummaryQuery } =
  orderApiSlice;
