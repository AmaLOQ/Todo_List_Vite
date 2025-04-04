import {createAction, createReducer} from "@reduxjs/toolkit";

export const changeThemeModeAC = createAction<{themeMode: ThemeModeType}>("app/CHANGE-THEME-MODE");

const initialState = {
    themeMode: 'light' as ThemeModeType
}

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {
            state.themeMode = action.payload.themeMode
        })
})

export type ThemeModeType = "light" | "dark"