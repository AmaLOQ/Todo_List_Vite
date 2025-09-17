import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"
import { DomainTodolist } from "@/features/todolists/lib/types"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      providesTags: ["Todolists"],
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => ({
          ...todolist,
          filter: "All",
          entityStatus: "idle",
        }))
      },
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolists"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}`,
        method: "DELETE",
        body: { todolistId },
      }),
      invalidatesTags: ["Todolists"],
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `/todo-lists/${todolistId}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolists"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistApi
