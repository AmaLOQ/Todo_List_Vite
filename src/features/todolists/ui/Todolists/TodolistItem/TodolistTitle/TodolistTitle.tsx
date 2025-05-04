import s from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.module.css"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useCallback } from "react"
import { changeTodolistTitleTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { EnableSpan } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const onClickChangeTodolistTitle = useCallback((newTitle: string) => {
    dispatch(changeTodolistTitleTC({ id: id, title: newTitle }))
  }, [])

  const onClickDeleteTodolist = useCallback(() => {
    dispatch(deleteTodolistTC({ id: id }))
  }, [])

  return (
    <>
      <div className={s.deleteIconWrapper}>
        <IconButton onClick={onClickDeleteTodolist} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      <h3 className={s.todoListTitle}>
        <EnableSpan text={title} changeTitle={onClickChangeTodolistTitle} />
      </h3>
    </>
  )
}
