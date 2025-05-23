import s from "./App.module.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Main } from "@/app/Main.tsx"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { selectThemeMode } from "@/app/app-slice.ts"

export const App = () => {
  console.log("app was called")

  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={s.app}>
        <CssBaseline />
        <Header />
        <Main />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
