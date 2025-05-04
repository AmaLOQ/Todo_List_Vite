import { useCallback } from "react"
import Button from "@mui/material/Button"
import { changeTodolistFilterAC, DomainTodolist, FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { useDispatch } from "react-redux"
import { Box } from "@mui/material"
import { containerSx } from "@/common/styles"

type Props = {
  todolist: DomainTodolist
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const dispatch = useDispatch()

  const onClickChangeFilter = useCallback((filter: FilterType, todolistID: string) => {
    dispatch(changeTodolistFilterAC({ todolistID: todolistID, filter: filter }))
  }, [])

  return (
    <Box sx={containerSx}>
      <Button
        size={"small"}
        color={filter === "All" ? "primary" : "inherit"}
        variant={filter === "All" ? "contained" : "text"}
        onClick={useCallback(() => onClickChangeFilter("All", id), [])}
      >
        All
      </Button>

      <Button
        size={"small"}
        color={filter === "Active" ? "primary" : "inherit"}
        variant={filter === "Active" ? "contained" : "text"}
        onClick={useCallback(() => onClickChangeFilter("Active", id), [])}
      >
        Active
      </Button>
      <Button
        size={"small"}
        color={filter === "Completed" ? "primary" : "inherit"}
        variant={filter === "Completed" ? "contained" : "text"}
        onClick={useCallback(() => onClickChangeFilter("Completed", id), [])}
      >
        Completed
      </Button>
    </Box>
  )
}
