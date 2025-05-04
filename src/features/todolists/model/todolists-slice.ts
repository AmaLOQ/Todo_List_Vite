import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: {
    todolists: [] as DomainTodolist[],
  },
  selectors: {
    selectTodolists: (state) => state.todolists,
  },
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{ todolistID: string; filter: FilterType }>((state, action) => {
      const index = state.todolists.findIndex((tl) => tl.id === action.payload.todolistID)
      if (index !== -1) {
        state.todolists[index].filter = action.payload.filter
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistTC.fulfilled, (_, action) => {
        return {
          todolists: action.payload.todolist.map((tl) => {
            return { ...tl, filter: "All" }
          }),
        }
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state.todolists[index].title = action.payload.title
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        const newTodolist = {
          id: action.payload.data.item.id,
          title: action.payload.data.item.title,
          addedDate: action.payload.data.item.addedDate,
          order: action.payload.data.item.order,
        } as Todolist
        state.todolists.unshift({ ...newTodolist, filter: "All" })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state.todolists.splice(index, 1)
        }
      })
  },
})

export const fetchTodolistTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistApi.getTodolist()
    return { todolist: res.data }
  } catch {
    return thunkAPI.rejectWithValue(null)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistApi.changeTodolistTitle(payload)
      return payload
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)
export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (payload: { title: string }, thunkAPI) => {
    try {
      const res = await todolistApi.createTodolist(payload.title)
      return res.data
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistApi.deleteTodolist(payload.id)
      return payload
    } catch {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const todolistsReducer = todolistsSlice.reducer

export const { selectTodolists } = todolistsSlice.selectors

export const { changeTodolistFilterAC } = todolistsSlice.actions

export type DomainTodolist = Todolist & { filter: FilterType }

export type FilterType = "All" | "Active" | "Completed"

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
