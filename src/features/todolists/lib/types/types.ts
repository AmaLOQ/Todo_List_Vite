import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { RequestStatus } from "@/common/types"

export type DomainTodolist = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}

export type FilterType = "All" | "Active" | "Completed"
