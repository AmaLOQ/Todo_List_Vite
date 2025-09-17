import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"
import { todolistApi } from "@/features/todolists/api/todolistApi.ts"
import { taskApi } from "@/features/todolists/api/tasksApi.ts"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeModeType,
    appStatus: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.appStatus,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.appStatus = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistApi.endpoints.getTodolists.matchPending(action) ||
          taskApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.appStatus = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.appStatus = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.appStatus = "failed"
      })
  },
})

export const appReducer = appSlice.reducer

export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedIn } = appSlice.actions

export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors

export type ThemeModeType = "light" | "dark"
