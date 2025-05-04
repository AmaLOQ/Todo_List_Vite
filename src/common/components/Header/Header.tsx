import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import { Switch } from "@mui/material"
import { changeThemeModeAC, selectThemeMode } from "@/app/app-slice.ts"
import { NavButton } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/styles"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)

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
    </AppBar>
  )
}
