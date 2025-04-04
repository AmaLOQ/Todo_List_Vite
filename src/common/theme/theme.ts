import {createTheme} from "@mui/material";
import {ThemeModeType} from "@/app/app-reducer.ts";

export const getTheme = (themeMode: ThemeModeType)=> {
    return  createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#bda957',
            },
        }
    })
}
