import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Switch from "@mui/material/Switch"
import { changeThemeModeAC, selectAppStatus, selectThemeMode } from "@/app/app-slice.ts"
import { NavButton } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"
import LinearProgress from "@mui/material/LinearProgress"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const appStatus = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar sx={{ mb: "30px" }} position="static">
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Container>
        <NavButton>Sign in</NavButton>
        <NavButton>Sign up</NavButton>
        <NavButton>Faq</NavButton>
        <Switch color={"default"} onChange={changeModeHandler} />
      </Toolbar>
      {appStatus === "loading" && <LinearProgress />}
    </AppBar>
  )
}
