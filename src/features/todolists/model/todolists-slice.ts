import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice.ts"

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
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload.todolists.forEach((tl) => {
            return state.todolists.push({ ...tl, filter: "All" })
          })
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (todolistTitle: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await todolistApi.createTodolist(todolistTitle)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolist: res.data.data.item }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.todolists.unshift({ ...action.payload.todolist, filter: "All" })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          await todolistApi.deleteTodolist(todolistId)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return { todolistId }
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
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
          await todolistApi.changeTodolistTitle(payload)
          dispatch(setAppStatusAC({ status: "succeeded" }))
          return payload
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }))
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
export const { changeTodolistFilterAC, fetchTodolistTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } =
  todolistsSlice.actions

export type DomainTodolist = Todolist & {
  filter: FilterType
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
