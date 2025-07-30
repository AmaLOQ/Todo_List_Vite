import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/taskItem/TaskItem.tsx"
import { DomainTodolist, FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/_tasksApi.ts"

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

  const { data } = useGetTasksQuery(id)

  const tasks = data?.items

  const filteredTasks = getFilteredTasks(tasks, filter)

  const mappedTasks = filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)

  return (
    <div className={s.tasksWrapper}>
      {filteredTasks.length === 0 ? <p className={s.noTasksText}>Тасок нет</p> : mappedTasks}
    </div>
  )
}
