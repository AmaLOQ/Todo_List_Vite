import Grid from "@mui/material/Grid2"
import Container from "@mui/material/Container"
import { useCallback } from "react"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { AddItemForm } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"

export const Main = () => {
  const dispatch = useAppDispatch()

  const onClickCreateTodoList = useCallback((todoListTitle: string) => {
    dispatch(createTodolistTC({ title: todoListTitle }))
  }, [])

  return (
    <Container fixed maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm label={"Add todo list"} addItem={onClickCreateTodoList} />
      </Grid>
      <Grid container spacing={4} rowSpacing={"50px"}>
        <Todolists />
      </Grid>
    </Container>
  )
}
