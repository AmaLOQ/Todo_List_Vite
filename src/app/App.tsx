import s from "./App.module.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice.ts"
import { Routing } from "@/common/routing/Routing.tsx"
import { useEffect, useState } from "react"
import { useMeQuery } from "@/features/auth/api/_authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"

export const App = () => {
  console.log("app was called")

  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (isLoading) return
    setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }, [isLoading])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={s.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
