import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/_todolistApi.ts"

export const Todolists = () => {
  const { data } = useGetTodolistsQuery()

  const mappedTodolists = data?.map((todolist) => {
    return (
      <Grid key={todolist.id} style={{ alignSelf: "flex-start" }}>
        <Paper style={{ marginRight: "25px", borderRadius: "10px" }} elevation={2}>
          <TodolistItem todolist={todolist} />
        </Paper>
      </Grid>
    )
  })

  return <>{mappedTodolists}</>
}
