import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import { selectTasks, TaskType } from "@/features/todolists/model/tasks-slice.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/taskItem/TaskItem.tsx"
import { DomainTodolist, FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { useAppSelector } from "@/common/hooks"

const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
  if (filter === "Active") return tasks.filter((t) => !t.isDone)
  if (filter === "Completed") return tasks.filter((t) => t.isDone)
  return tasks
}

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const filteredTasks = getFilteredTasks(tasks[todolist.id], todolist.filter)

  const mappedTasks = filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolistID={todolist.id} />)

  return (
    <div className={s.tasksWrapper}>
      {tasks[todolist.id]?.length === 0 ? <p className={s.noTasksText}>Тасок нет</p> : mappedTasks}
    </div>
  )
}
