import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TodoListType[] = []

export const removeTodoListAC = createAction<{todoListID: string}>("todolists/REMOVE-TODOLIST")

export const addTodoListAC = createAction("todolists/ADD-TODOLIST", (title: string)=> {
    return {payload: {todoListID: nanoid(), title}}
})

export const changeTodoListTitleAC = createAction<{todoListID: string, todoListTitle: string}>("todolists/CHANGE-TODOLIST-TITLE")

export const changeTodoListFilterAC = createAction<{todoListID: string, filter: FilterType}>("todolists/CHANGE-TODOLIST-FILTER")


export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(removeTodoListAC, (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.todoListID)
            if(index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(addTodoListAC, (state, action) => {
            state.unshift({id: action.payload.todoListID, title: action.payload.title, filter: 'All'})
        })
        .addCase(changeTodoListTitleAC, (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.todoListID)
            if(index !== -1) {
                state[index].title = action.payload.todoListTitle
            }
        })
        .addCase(changeTodoListFilterAC, (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.todoListID)
            if(index !== -1) {
                state[index].filter = action.payload.filter
            }
        })
})

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'All' | 'Active' | 'Completed'