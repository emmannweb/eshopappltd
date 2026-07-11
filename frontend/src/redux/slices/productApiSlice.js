import { PRODUCTS_URL } from "../constants/constants";
import { api } from "./apiSlice";

export const productApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `${PRODUCTS_URL}/delete/${product_id}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useDeleteProductMutation } = productApiSlice;
