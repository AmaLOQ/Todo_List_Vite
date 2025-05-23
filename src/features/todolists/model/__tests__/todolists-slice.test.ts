import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  todolistsReducer,
  DomainTodolist,
  FilterType,
} from "../todolists-slice"
import { beforeEach, expect, test } from "vitest"
import { nanoid } from "@reduxjs/toolkit"

let firstTodoListID: string
let secondTodoListID: string

let startState: DomainTodolist[]

beforeEach(() => {
  firstTodoListID = nanoid()
  secondTodoListID = nanoid()

  startState = [
    { id: firstTodoListID, title: "What to learn", addedDate: "", order: 0, filter: "All", entityStatus: "idle" },
    { id: secondTodoListID, title: "What to buy", addedDate: "", order: 0, filter: "All", entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  const action = deleteTodolistTC.fulfilled({ todolistId: firstTodoListID }, "requestId", firstTodoListID)

  const endState = todolistsReducer({ todolists: startState }, action).todolists

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(secondTodoListID)
})

test("correct todolist should be added", () => {
  const newTodolist = {
    id: "newID",
    title: "What to see",
    addedDate: "",
    order: 0,
  }

  const action = createTodolistTC.fulfilled({ todolist: newTodolist }, "requestId", newTodolist.title)

  const endState = todolistsReducer({ todolists: startState }, action).todolists

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("What to see")
  expect(endState[0].filter).toBe("All")
})

test("correct todolist should change title", () => {
  const newTitle = "New Title"

  const action = changeTodolistTitleTC.fulfilled({ todolistId: firstTodoListID, title: newTitle }, "requestId", {
    todolistId: firstTodoListID,
    title: newTitle,
  })

  const endState = todolistsReducer({ todolists: startState }, action).todolists

  expect(endState[0].title).toBe("New Title")
  expect(endState[1].title).toBe("What to buy")
})

test("correct todolist should change filter", () => {
  const newFilter: FilterType = "Completed"

  const action = changeTodolistFilterAC({ todolistID: firstTodoListID, filter: newFilter })

  const endState = todolistsReducer({ todolists: startState }, action).todolists

  expect(endState[0].filter).toBe("Completed")
  expect(endState[1].filter).toBe("All")
})
