import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback } from "react"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { EnableSpan } from "@/common/components"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/_todolistApi.ts"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const onClickChangeTodolistTitle = useCallback((newTitle: string) => {
    changeTodolistTitle({ todolistId: id, title: newTitle })
  }, [])

  const onClickDeleteTodolist = useCallback(() => {
    deleteTodolist(id)
  }, [])

  const isDisabled = entityStatus === "loading"

  return (
    <>
      <div className={s.deleteIconWrapper}>
        <IconButton onClick={onClickDeleteTodolist} aria-label="delete" disabled={isDisabled}>
          <DeleteIcon />
        </IconButton>
      </div>
      <h3 className={s.todoListTitle}>
        <EnableSpan text={title} changeTitle={onClickChangeTodolistTitle} disabled={isDisabled} />
      </h3>
    </>
  )
}
