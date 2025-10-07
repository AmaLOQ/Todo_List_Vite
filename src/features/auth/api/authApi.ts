import { BaseResponse } from "@/common/types"
import { LoginType } from "@/features/auth/lib"
import { baseApi } from "@/app/baseApi.ts"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "/auth/me",
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginType>({
      query: (login) => ({
        url: "/auth/login",
        method: "POST",
        body: login,
      }),
    }),
    loguot: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: "/auth/login",
        method: "DELETE",
      }),
    }),
    getCaptchaUrl: builder.query<{ url: string }, void>({
      query: () => ({
        url: `/security/get-captcha-url`,
        method: "GET",
      }),
    }),
  }),
})

export const { useMeQuery, useLazyGetCaptchaUrlQuery, useLoginMutation, useLoguotMutation } = authApi
