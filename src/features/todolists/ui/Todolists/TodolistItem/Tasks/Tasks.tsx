import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/taskItem/TaskItem.tsx"
import { DomainTodolist, FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { useEffect } from "react"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums"

const getFilteredTasks = (tasks: DomainTask[], filter: FilterType): DomainTask[] => {
  if (filter === "Active") return tasks.filter((t) => t.status === TaskStatus.New)
  if (filter === "Completed") return tasks.filter((t) => t.status === TaskStatus.Completed)
  return tasks
}

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const filteredTasks = getFilteredTasks(tasks[id], filter)

  const mappedTasks = filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistId={todolist.id} />)

  return (
    <div className={s.tasksWrapper}>
      {tasks[todolist.id]?.length === 0 ? <p className={s.noTasksText}>Тасок нет</p> : mappedTasks}
    </div>
  )
}
