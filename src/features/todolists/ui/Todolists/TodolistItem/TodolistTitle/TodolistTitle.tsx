import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback } from "react"
import { EnableSpan } from "@/common/components"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistApi.ts"
import { DomainTodolist } from "@/features/todolists/lib/types"
import { useAppDispatch } from "@/common/hooks"
import { changeTodolistStatus } from "@/common/utils"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const dispatch = useAppDispatch()

  const onClickChangeTodolistTitle = useCallback((newTitle: string) => {
    changeTodolistTitle({ todolistId: id, title: newTitle })
  }, [])

  const onClickDeleteTodolist = () => {
    dispatch(changeTodolistStatus("loading", id))
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        dispatch(changeTodolistStatus("idle", id))
      })
  }

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
