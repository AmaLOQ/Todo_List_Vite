import {TasksObjType, TodoListType} from "../App";
import {addTodoListAC, todoListsReducer} from "./todolists-reducer";
import {taskReducer} from "./task-reducer";

test('ids should be equal', ()=> {
    const taskState: TasksObjType = {}
    const todoListState: TodoListType[] = []

    const action = addTodoListAC('new Todolist')

    const endTaskState = taskReducer(taskState, action)
    const endTodoListState = todoListsReducer(todoListState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodoList = endTodoListState[0].id

    expect(idFromTask).toBe(action.payload.todoListID)
    expect(idFromTodoList).toBe(action.payload.todoListID)
})