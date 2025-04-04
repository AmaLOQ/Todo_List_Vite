import {addTodoListAC, removeTodoListAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const removeTaskAC = createAction<{taskID: string, todolistID: string}>("tasks/REMOVE-TASK")

export const addTaskAC = createAction<{taskTitle: string, todolistID: string}>("tasks/ADD-TASK")

export const changeTaskStatusAC = createAction<{taskID: string, taskStatus: boolean, todolistID: string}>("tasks/CHANGE-TASK-STATUS")

export const changeTaskTitleAC = createAction<{taskID: string, taskTitle: string, todolistID: string}>("tasks/CHANGE-TASK-TITLE")

const initialState: TasksObjType = {}


export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListID]
        })
        .addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoListID] = []
        })
        .addCase(removeTaskAC, (state, action) => {
            const correctTasksArray = state[action.payload.todolistID]
            const index = correctTasksArray.findIndex(task => task.id === action.payload.taskID)
            if (index !== -1) {
                correctTasksArray.splice(index, 1)
            }
        })
        .addCase(addTaskAC, (state, action) => {
            const correctTasksArray = state[action.payload.todolistID]
            if(correctTasksArray) {
                correctTasksArray.push({id: nanoid(), task: action.payload.taskTitle, isDone: false})
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const correctTask = state[action.payload.todolistID].find(task => task.id === action.payload.taskID)
            if(correctTask) {
                correctTask.isDone = action.payload.taskStatus
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const correctTask = state[action.payload.todolistID].find(task => task.id === action.payload.taskID)
            if(correctTask) {
                correctTask.task = action.payload.taskTitle
            }
        })
})

export type TaskType = {
    id: string,
    task: string,
    isDone: boolean
}

export type TasksObjType = { [key: string]: TaskType[] }
