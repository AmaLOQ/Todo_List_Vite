import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback } from "react"
import { changeTodolistTitleTC, deleteTodolistTC, DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { EnableSpan } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const onClickChangeTodolistTitle = useCallback((newTitle: string) => {
    dispatch(changeTodolistTitleTC({ todolistId: id, title: newTitle }))
  }, [])

  const onClickDeleteTodolist = useCallback(() => {
    dispatch(deleteTodolistTC(id))
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
