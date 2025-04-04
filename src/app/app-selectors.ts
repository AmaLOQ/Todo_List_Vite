import {RootState} from "./store.ts";
import {ThemeModeType} from "./app-reducer.ts";

export const selectThemeMode = (state: RootState): ThemeModeType => state.app.themeMode