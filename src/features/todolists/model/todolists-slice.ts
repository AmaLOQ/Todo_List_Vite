import { Todolist, TodolistSchema } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums/enums.ts"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: {
    todolists: [] as DomainTodolist[],
  },
  selectors: {
    selectTodolists: (state) => state.todolists,
  },
  reducers: (create) => ({
    fetchTodolistTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistApi.getTodolist()
          const todolist = TodolistSchema.array().parse(res.data)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolists: todolist }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload.todolists.forEach((tl) => {
            return state.todolists.push({ ...tl, filter: "All", entityStatus: "idle" })
          })
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (todolistTitle: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistApi.createTodolist(todolistTitle)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolist: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.todolists.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          dispatch(changeTodolistStatusAC({ todolistId, status: "loading" }))
          const res = await todolistApi.deleteTodolist(todolistId)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(changeTodolistStatusAC({ todolistId, status: "succeeded" }))
            return { todolistId }
          } else {
            dispatch(changeTodolistStatusAC({ todolistId, status: "failed" }))
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          dispatch(changeTodolistStatusAC({ todolistId, status: "failed" }))
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.todolists.findIndex((tl) => tl.id === action.payload.todolistId)
          if (index !== -1) {
            state.todolists.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistApi.changeTodolistTitle(payload)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            return payload
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const todolist = state.todolists.find((tl) => tl.id === action.payload.todolistId)
          if (todolist) {
            todolist.title = action.payload.title
          }
        },
      },
    ),
    changeTodolistFilterAC: create.reducer<{ todolistID: string; filter: FilterType }>((state, action) => {
      const index = state.todolists.findIndex((tl) => tl.id === action.payload.todolistID)
      if (index !== -1) {
        state.todolists[index].filter = action.payload.filter
      }
    }),
    changeTodolistStatusAC: create.reducer<{ todolistId: string; status: RequestStatus }>((state, action) => {
      const todlolist = state.todolists.find((tl) => tl.id === action.payload.todolistId)
      if (todlolist) {
        todlolist.entityStatus = action.payload.status
      }
    }),
  }),
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
  //       const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
  //       if (index !== -1) {
  //         state.todolists[index].title = action.payload.title
  //       }
  //     })
  //     .addCase(createTodolistTC.fulfilled, (state, action) => {
  //       state.todolists.unshift({ ...action.payload.todolist, filter: "All" })
  //     })
  //     .addCase(deleteTodolistTC.fulfilled, (state, action) => {
  //       const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
  //       if (index !== -1) {
  //         state.todolists.splice(index, 1)
  //       }
  //     })
  // },
})

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodolists } = todolistsSlice.selectors
export const {
  changeTodolistFilterAC,
  changeTodolistStatusAC,
  fetchTodolistTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
} = todolistsSlice.actions

export type DomainTodolist = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}

export type FilterType = "All" | "Active" | "Completed"

/// RTK syntacsis 1.0
// export const changeTodolistTitleTC = createAsyncThunk(
//   `${todolistsSlice.name}/changeTodolistTitleTC`,
//   async (payload: { id: string; title: string }, thunkAPI) => {
//     try {
//       await todolistApi.changeTodolistTitle(payload)
//       return payload
//     } catch {
//       return thunkAPI.rejectWithValue(null)
//     }
//   },
// )
// export const createTodolistTC = createAsyncThunk(
//   `${todolistsSlice.name}/createTodolistTC`,
//   async (payload: { title: string }, thunkAPI) => {
//     try {
//       const res = await todolistApi.createTodolist(payload.title)
//       return { todolist: res.data.data.item }
//     } catch {
//       return thunkAPI.rejectWithValue(null)
//     }
//   },
// )
//
// export const deleteTodolistTC = createAsyncThunk(
//   `${todolistsSlice.name}/deleteTodolistTC`,
//   async (id: string, thunkAPI) => {
//     try {
//       await todolistApi.deleteTodolist(id)
//       return { id }
//     } catch {
//       return thunkAPI.rejectWithValue(null)
//     }
//   },
// )

// const initialState: TodoListType[] = []
//
// export const removeTodoListAC = createAction<{ todoListID: string }>("todolists/REMOVE-TODOLIST")
//
// export const addTodoListAC = createAction("todolists/ADD-TODOLIST", (title: string) => {
//   return { payload: { todoListID: nanoid(), title } }
// })
//
// export const changeTodoListTitleAC = createAction<{ todoListID: string; todoListTitle: string }>(
//   "todolists/CHANGE-TODOLIST-TITLE",
// )
//
// export const changeTodoListFilterAC = createAction<{ todoListID: string; filter: FilterType }>(
//   "todolists/CHANGE-TODOLIST-FILTER",
// )
//
// export const todolistsReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(removeTodoListAC, (state, action) => {
//       const index = state.findIndex((item) => item.id === action.payload.todoListID)
//       if (index !== -1) {
//         state.splice(index, 1)
//       }
//     })
//     .addCase(addTodoListAC, (state, action) => {
//       state.unshift({ id: action.payload.todoListID, title: action.payload.title, filter: "All" })
//     })
//     .addCase(changeTodoListTitleAC, (state, action) => {
//       const index = state.findIndex((item) => item.id === action.payload.todoListID)
//       if (index !== -1) {
//         state[index].title = action.payload.todoListTitle
//       }
//     })
//     .addCase(changeTodoListFilterAC, (state, action) => {
//       const index = state.findIndex((item) => item.id === action.payload.todoListID)
//       if (index !== -1) {
//         state[index].filter = action.payload.filter
//       }
//     })
// })
//
