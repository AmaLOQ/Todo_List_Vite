import { z } from "zod"

export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string().datetime({ local: true }),
})

export type Todolist = z.infer<typeof TodolistSchema>
