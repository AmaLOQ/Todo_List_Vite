import { createAppSlice } from "@/common/utils/createAppSlice.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { RootState } from "@/app/store.ts"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {
    tasks: {} as TasksState,
  },
  selectors: {
    selectTasks: (state) => state.tasks,
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.tasks[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { title: string; todolistId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.createTask(payload)
          console.log(res.data)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.tasks[action.payload.task.todoListId].unshift(action.payload.task)
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          await tasksApi.deleteTask(payload)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return payload
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.tasks[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
          if (index !== -1) {
            state.tasks[action.payload.todolistId].splice(index, 1)
          }
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
        { dispatch, rejectWithValue, getState },
      ) => {
        const { todolistId, domainModel, taskId } = payload

        const allTodolistTasks = (getState() as RootState).tasks.tasks[todolistId]
        const task = allTodolistTasks.find((task) => task.id === taskId)

        if (!task) {
          return rejectWithValue(null)
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: domainModel.title ?? task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status: domainModel.status ?? task.status,
        }
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ taskId, todolistId, model })
          dispatch(setAppStatusAC({ status: "succeeded" }))
          console.log(res.data)
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.tasks[action.payload.task.todoListId].findIndex(
            (task) => task.id === action.payload.task.id,
          )
          if (index !== -1) {
            state.tasks[action.payload.task.todoListId][index] = action.payload.task
          }
        },
      },
    ),
    // deleteTaskAC: create.reducer<{ todolistID: string; taskID: string }>((state, action) => {
    //   const index = state.tasks[action.payload.todolistID].findIndex((task) => task.id === action.payload.taskID)
    //   if (index !== -1) {
    //     state.tasks[action.payload.todolistID].splice(index, 1)
    //   }
    // }),
    // createTaskAC: create.reducer<{ todolistID: string; title: string }>((state, action) => {
    //   const newTask = { id: nanoid(), task: action.payload.title, isDone: false }
    //   state.tasks[action.payload.todolistID].unshift(newTask)
    // }),
    // changeTaskStatusAC: create.reducer<{ todolistID: string; taskID: string; isDone: boolean }>((state, action) => {
    //   const task = state.tasks[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
    //   if (task) {
    //     task.isDone = action.payload.isDone
    //   }
    // }),
    // changeTaskTitleAC: create.reducer<{ todolistID: string; taskID: string; title: string }>((state, action) => {
    //   const task = state.tasks[action.payload.todolistID].find((task) => task.id === action.payload.taskID)
    //   if (task) {
    //     task.task = action.payload.title
    //   }
    // }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.tasks[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state.tasks[action.payload.todolistId]
      })
  },
})

export const tasksReducer = tasksSlice.reducer

export const { selectTasks } = tasksSlice.selectors

export const { fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC } = tasksSlice.actions

export type TasksState = Record<string, DomainTask[]>

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
