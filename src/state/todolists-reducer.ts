
import {v1} from "uuid";

export type RemoveTodoListType = ReturnType<typeof removeTodoListAC>
export type AddTodoListType = ReturnType<typeof addTodoListAC>
type ChangeTodoListTitleType = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterType = ReturnType<typeof changeTodoListFilterAC>

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodoListReducerType = ChangeTodoListFilterType
    | ChangeTodoListTitleType
    | AddTodoListType
    | RemoveTodoListType

const initialState: TodoListType[] = []

export const todoListsReducer = (state: TodoListType[] = initialState, action: TodoListReducerType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todoListID)
        case 'ADD-TODOLIST':
            return [{id: action.payload.todoListID, title: action.payload.title, filter: 'All'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return  state.map(tl => tl.id === action.payload.todoListID ? {...tl, title: action.payload.todoListTitle} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.todoListID ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (todoListID: string) => {
    return {type: 'REMOVE-TODOLIST', payload:{todoListID}} as const
}
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', payload: {todoListID: v1(), title}} as const
}
export const changeTodoListTitleAC = (todoListID: string, todoListTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload:{todoListID, todoListTitle}} as const
}
export const changeTodoListFilterAC = (todoListID: string, filter: FilterType) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload:{todoListID, filter}} as const
}
