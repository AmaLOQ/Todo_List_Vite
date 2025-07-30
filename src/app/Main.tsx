import Grid from "@mui/material/Grid2"
import Container from "@mui/material/Container"
import { useCallback } from "react"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { AddItemForm } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { Navigate } from "react-router"
import { PATH } from "@/common/routing"
import { useCreateTodolistMutation } from "@/features/todolists/api/_todolistApi.ts"
import { selectIsLoggedIn } from "@/app/app-slice.ts"

export const Main = () => {
  const [createTodolist] = useCreateTodolistMutation()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const onClickCreateTodoList = useCallback((todolistTitle: string) => {
    createTodolist(todolistTitle)
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.Login} />
  }

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
