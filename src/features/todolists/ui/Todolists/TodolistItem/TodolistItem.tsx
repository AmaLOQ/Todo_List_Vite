import { memo, useCallback } from "react"
import s from "./TodolistItem.module.css"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { createTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { useAppDispatch } from "@/common/hooks"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = memo(({ todolist }: Props) => {
  const { id } = todolist

  const dispatch = useAppDispatch()

  const createTask = useCallback((title: string) => {
    dispatch(createTaskTC({ title, todolistId: id }))
  }, [])

  return (
    <div className={s.todoWrapper}>
      <div className={s.topContainer}>
        <TodolistTitle todolist={todolist} />
        <AddItemForm label={"Add task"} addItem={createTask} />
      </div>
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
})
