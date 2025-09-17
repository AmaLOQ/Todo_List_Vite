import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistApi.ts"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import { Box } from "@mui/material"
import { containerSx } from "@/common/styles"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }

  const mappedTodolists = todolists?.map((todolist) => {
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
