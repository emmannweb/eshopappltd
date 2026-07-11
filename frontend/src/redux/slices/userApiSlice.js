import { USERS_URL } from "../constants/constants";
import { api } from "./apiSlice";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: user,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: user,
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
    }),

    allUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    deleteUser: builder.mutation({
      query: (user_id) => ({
        url: `${USERS_URL}/admin/delete/${user_id}`,
        method: "DELETE",
      }),
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProfileQuery,
  useAllUsersQuery,
  useLogOutUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
