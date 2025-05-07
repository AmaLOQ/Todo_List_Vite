import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeModeType,
    appStatus: "idle" as RequestStatus,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.appStatus,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.appStatus = action.payload.status
    }),
  }),
})

export const appReducer = appSlice.reducer

export const { changeThemeModeAC, setAppStatusAC } = appSlice.actions

export const { selectThemeMode, selectAppStatus } = appSlice.selectors

export type ThemeModeType = "light" | "dark"
