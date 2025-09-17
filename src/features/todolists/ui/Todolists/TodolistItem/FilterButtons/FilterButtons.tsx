import { useCallback } from "react"
import Button from "@mui/material/Button"
import { DomainTodolist, FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { Box } from "@mui/material"
import { containerSx } from "@/common/styles"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { useAppDispatch } from "@/common/hooks"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useAppDispatch()

  const onClickChangeFilter = (filter: FilterType) => {
    dispatch(
      todolistApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <Box sx={containerSx}>
      <Button
        size={"small"}
        color={filter === "All" ? "primary" : "inherit"}
        variant={filter === "All" ? "contained" : "text"}
        onClick={useCallback(() => onClickChangeFilter("All"), [])}
      >
        All
      </Button>

      <Button
        size={"small"}
        color={filter === "Active" ? "primary" : "inherit"}
        variant={filter === "Active" ? "contained" : "text"}
        onClick={useCallback(() => onClickChangeFilter("Active"), [])}
      >
        Active
      </Button>
      <Button
        size={"small"}
        color={filter === "Completed" ? "primary" : "inherit"}
        variant={filter === "Completed" ? "contained" : "text"}
        onClick={useCallback(() => onClickChangeFilter("Completed"), [])}
      >
        Completed
      </Button>
    </Box>
  )
}
