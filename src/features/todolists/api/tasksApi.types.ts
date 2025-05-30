import { TaskPriority, TaskStatus } from "@/common/enums"
import { z } from "zod"

export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  addedDate: z.string().datetime({ local: true }),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
})

export type DomainTask = z.infer<typeof DomainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string | null
  startDate: string | null
  deadline: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
}
