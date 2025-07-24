import Grid from "@mui/material/Grid2"
import Container from "@mui/material/Container"
import { useCallback } from "react"
import { createTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { AddItemForm } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Navigate } from "react-router"
import { PATH } from "@/common/routing"

export const Main = () => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const onClickCreateTodoList = useCallback((todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
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
