import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"

export const baseApi = createApi({
  reducerPath: "todo-lists",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
      headers.set("API-KEY", import.meta.env.VITE_API_KEY)
    },
  }),
  tagTypes: ["Todolists", "Tasks"],
  endpoints: () => ({}),
})
