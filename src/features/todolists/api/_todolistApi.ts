import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse, RequestStatus } from "@/common/types"
import { DomainTodolist, FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { baseApi } from "@/app/baseApi.ts"
import { instance } from "@/common/instance"

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      providesTags: ["Todolists"],
      transformResponse: (todolists: Todolist[]): DomainTodolist[] => {
        return todolists.map((todolist) => ({
          ...todolist,
          filter: "all" as FilterType,
          entityStatus: "idle" as RequestStatus,
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

export const _todolistApi = {
  getTodolist: () => {
    return instance.get<Todolist[]>("/todo-lists")
  },
  deleteTodolist: (todolistId: string) => {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`)
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: Todolist }>>(`/todo-lists`, { title })
  },
  changeTodolistTitle: (payload: { title: string; todolistId: string }) => {
    const { todolistId, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, { title })
  },
}
