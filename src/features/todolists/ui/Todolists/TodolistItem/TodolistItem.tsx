import { memo, useCallback, useEffect } from "react"
import s from "./TodolistItem.module.css"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { useDispatch } from "react-redux"
import { createTaskAC } from "@/features/todolists/model/tasks-slice.ts"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = memo(({ todolist }: Props) => {
  console.log("todo was called")

  const dispatch = useDispatch()

  const createTask = useCallback((title: string) => {
    dispatch(createTaskAC({ title: title, todolistID: todolist.id }))
  }, [])

  useEffect(() => {
    tasksApi.createTask({ todolistID: "b15522ad-592a-4d13-87f1-f00d3c27cf96", taskTitle: "hello" }).then((res) => {
      console.log(res.data)
    })
  }, [])

  return (
    <div className={s.todoWrapper} key={todolist.id}>
      <div className={s.topContainer}>
        <TodolistTitle todolist={todolist} />
        <AddItemForm label={"Add task"} addItem={createTask} />
      </div>
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
})
