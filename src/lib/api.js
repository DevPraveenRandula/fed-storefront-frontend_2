// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://fed-storefront-backend-praveen.onrender.com/api",
    prepareHeaders: async (headers) => {
      try {
        if (window.Clerk?.session) {
          const token = await window.Clerk.session.getToken();
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        }
      } catch (error) {
        console.error("Error getting auth token:", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
        credentials: 'include',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
} = Api;
