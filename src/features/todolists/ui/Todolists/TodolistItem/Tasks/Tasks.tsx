import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/taskItem/TaskItem.tsx"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskSkeleton/TaskSkeleton.tsx"
import { DomainTodolist, FilterType } from "@/features/todolists/lib/types"
import { List } from "@mui/material"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx"
import { useState } from "react"
import { PAGE_SIZE } from "@/common/constants"

const getFilteredTasks = (tasks: DomainTask[] | undefined, filter: FilterType): DomainTask[] => {
  if (!tasks) return []

  if (filter === "Active") return tasks.filter((t) => t.status === TaskStatus.New)
  if (filter === "Completed") return tasks.filter((t) => t.status === TaskStatus.Completed)
  return tasks
}

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const [page, setPage] = useState<number>(1)

  const { data = { items: [], totalCount: 0 }, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })

  const tasks = data.items

  const filteredTasks = getFilteredTasks(tasks, filter)

  const mappedTasks = filteredTasks?.map((task) => (
    <TaskItem key={task.id} task={task} todolist={todolist} page={page} />
  ))

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <div className={s.tasksWrapper}>
      <List>{filteredTasks.length === 0 ? <p className={s.noTasksText}>Тасок нет</p> : mappedTasks}</List>
      {data.totalCount > PAGE_SIZE && (
        <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
      )}
    </div>
  )
}
