import { instance } from "@/common/instance"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"

export const todolistApi = {
  getTodolist: () => {
    return instance.get<Todolist[]>("/todo-lists")
  },
  deleteTodolist: (id: string) => {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  createTodolist: (title: string) => {
    return instance.post<BaseResponse<{ item: Todolist }>>(`/todo-lists`, { title })
  },
  changeTodolistTitle: (payload: { title: string; id: string }) => {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}
