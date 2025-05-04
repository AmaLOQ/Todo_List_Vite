import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistsReducer,
} from "../todolists-slice.ts"
import { beforeEach, expect, test } from "vitest"
import { FilterType, TodoListType } from "../todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"

let firstTodoListID: string
let secondTodoListID: string

let startState: TodoListType[]

beforeEach(() => {
  firstTodoListID = nanoid()
  secondTodoListID = nanoid()

  startState = [
    { id: firstTodoListID, title: "What to learn", filter: "All" },
    { id: secondTodoListID, title: "What to buy", filter: "All" },
  ]
})

test("correct todolist should be removed", () => {
  const action = removeTodoListAC({ todoListID: firstTodoListID })

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(secondTodoListID)
})

test("correct todolist should be added", () => {
  const newTodoListTitle = "What to see"

  const action = addTodoListAC(newTodoListTitle)

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodoListTitle)
  expect(endState[2].filter).toBe("All")
})

test("correct todolist should change title", () => {
  const newTodoListTitle = "New Title"

  const action = changeTodoListTitleAC({ todoListID: firstTodoListID, todoListTitle: newTodoListTitle })

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe(newTodoListTitle)
  expect(endState[1].title).toBe("What to buy")
})

test("correct todolist should change filter", () => {
  const newFilterValue: FilterType = "Completed"

  const action = changeTodoListFilterAC({ todoListID: firstTodoListID, filter: newFilterValue })

  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe(newFilterValue)
  expect(endState[1].filter).toBe("All")
})
