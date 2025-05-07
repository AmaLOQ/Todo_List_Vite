import { instance } from "@/common/instance"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"

export const todolistApi = {
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
