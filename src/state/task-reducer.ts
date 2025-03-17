import {AddTodoListType, RemoveTodoListType} from "./todolists-reducer";
import {v1} from "uuid";

export type TasksType = {
    id: string
    task: string
    isDone: boolean
}

export type TasksObjType = { [key: string]: TasksType[] }

type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodoListType
    | RemoveTodoListType

const initialState: TasksObjType = {}
export const taskReducer = (state: TasksObjType = initialState, action: ActionType): TasksObjType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
        case 'ADD-TASK':
            const newTask = {id: v1(), task: action.taskTitle, isDone: false}
            return {...state, [action.todolistID]: [...state[action.todolistID], newTask]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskID ? {...task, isDone: action.taskStatus} : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskID ? {...task, task: action.title} : task)
            }
        case 'ADD-TODOLIST':
              return  {...state, [action.payload.todoListID]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.todoListID]
            return copyState
        default:
            return  state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskID: taskID, todolistID: todolistID} as const
}
export const addTaskAC = (taskTitle: string, todolistID: string) => {
    return {type: 'ADD-TASK', taskTitle: taskTitle, todolistID: todolistID} as const
}
export const changeTaskStatusAC = (taskID: string, taskStatus: boolean, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, taskStatus: taskStatus, todolistID: todolistID} as const
}
export const changeTaskTitleAC = (taskID: string, taskTitle: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, title: taskTitle, todolistID: todolistID} as const
}


