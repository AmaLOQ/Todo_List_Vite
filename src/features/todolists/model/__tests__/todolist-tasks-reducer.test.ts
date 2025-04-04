import {addTodoListAC, todolistsReducer, TodoListType} from "../todolists-reducer.ts";
import {tasksReducer, TasksObjType} from "../tasks-reducer.ts";
import {test, expect} from "vitest";

test('ids should be equal', ()=> {
    const taskState: TasksObjType = {}
    const todoListState: TodoListType[] = []

    const action = addTodoListAC('new Todolist')

    const endTaskState = tasksReducer(taskState, action)
    const endTodoListState = todolistsReducer(todoListState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodoList = endTodoListState[0].id

    expect(idFromTask).toBe(action.payload.todoListID)
    expect(idFromTodoList).toBe(action.payload.todoListID)
})