import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: {} as TasksState,
  },
  selectors: {
    selectTasks: (state) => state.tasks,
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistID: string; taskID: string }>((state, action) => {
      const index = state.tasks[action.payload.todolistID].findIndex((task) => task.id === action.payload.taskID)
      if (index !== -1) {
        state.tasks[action.payload.todolistID].splice(index, 1)
      }
    }),
    createTaskAC: create.reducer<{ todolistID: string; title: string }>((state, action) => {
      const newTask = { id: nanoid(), task: action.payload.title, isDone: false }
      state.tasks[action.payload.todolistID].unshift(newTask)
    }),
    changeTaskStatusAC: create.reducer<{ todolistID: string; taskID: string; isDone: boolean }>((state, action) => {
      const task = state.tasks[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
      if (task) {
        task.isDone = action.payload.isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistID: string; taskID: string; title: string }>((state, action) => {
      const task = state.tasks[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
      if (task) {
        task.task = action.payload.title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.tasks[action.payload.data.item.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state.tasks[action.payload.id]
      })
    // .addCase(createTodolistAC, (state, action) => {
    //   state.tasks[action.payload.id] = []
    // })
    // .addCase(deleteTodolistAC, (state, action) => {
    //   delete state.tasks[action.payload.todolistID]
    // })
  },
})

export const tasksReducer = tasksSlice.reducer

export const { selectTasks } = tasksSlice.selectors

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions

// export const removeTaskAC = createAction<{ taskID: string; todolistID: string }>("tasks/REMOVE-TASK")
//
// export const addTaskAC = createAction<{ taskTitle: string; todolistID: string }>("tasks/ADD-TASK")
//
// export const changeTaskStatusAC = createAction<{ taskID: string; taskStatus: boolean; todolistID: string }>(
//   "tasks/CHANGE-TASK-STATUS",
// )
//
// export const changeTaskTitleAC = createAction<{ taskID: string; taskTitle: string; todolistID: string }>(
//   "tasks/CHANGE-TASK-TITLE",
// )
//
// const initialState: TasksObjType = {}
//
// export const tasksReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(removeTodoListAC, (state, action) => {
//       delete state[action.payload.todoListID]
//     })
//     .addCase(addTodoListAC, (state, action) => {
//       state[action.payload.todoListID] = []
//     })
//     .addCase(removeTaskAC, (state, action) => {
//       const correctTasksArray = state[action.payload.todolistID]
//       const index = correctTasksArray.findIndex((task) => task.id === action.payload.taskID)
//       if (index !== -1) {
//         correctTasksArray.splice(index, 1)
//       }
//     })
//     .addCase(addTaskAC, (state, action) => {
//       const correctTasksArray = state[action.payload.todolistID]
//       if (correctTasksArray) {
//         correctTasksArray.push({ id: nanoid(), task: action.payload.taskTitle, isDone: false })
//       }
//     })
//     .addCase(changeTaskStatusAC, (state, action) => {
//       const correctTask = state[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
//       if (correctTask) {
//         correctTask.isDone = action.payload.taskStatus
//       }
//     })
//     .addCase(changeTaskTitleAC, (state, action) => {
//       const correctTask = state[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
//       if (correctTask) {
//         correctTask.task = action.payload.taskTitle
//       }
//     })
// })

export type TaskType = {
  id: string
  task: string
  isDone: boolean
}

export type TasksState = Record<string, TaskType[]>
