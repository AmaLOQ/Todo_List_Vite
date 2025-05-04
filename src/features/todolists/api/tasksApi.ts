import { instance } from "@/common/instance"
import { UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"

export const tasksApi = {
  getTasks: (todolistID: string) => {
    return instance.get(`todo-lists/${todolistID}/tasks`)
  },
  createTask: (payload: { todolistID: string; taskTitle: string }) => {
    const { todolistID, taskTitle } = payload
    return instance.post(`todo-lists/${todolistID}/tasks`, { taskTitle })
  },
  deleteTask: (payload: { todolistID: string; taskID: string }) => {
    const { todolistID, taskID } = payload
    return instance.delete(`/todo-lists/${todolistID}/tasks/${taskID}`)
  },
  changeTaskStatus: (payload: { todolistID: string; taskID: string; model: UpdateTaskModel }) => {
    const { todolistID, taskID, model } = payload
    return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, { model })
  },
  changeTaskTitle: (payload: { todolistID: string; taskID: string; model: UpdateTaskModel }) => {
    const { todolistID, taskID, model } = payload
    return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`, model)
  },
}
