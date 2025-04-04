import s from './App.module.css'
import {Header} from "../common/components/Header/Header.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectThemeMode} from "./app-selectors.ts";
import {getTheme} from "../common/theme/theme.ts";
import {Main} from "@/app/Main.tsx";

export const App = () => {
    console.log('app was called')

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={s.app}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    );
}