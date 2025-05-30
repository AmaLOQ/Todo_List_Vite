import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components"

export const PATH = {
  Main: "/",
  Login: "/login",
  PageNotFound: "/*",
}

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.Main} element={<Main />} />
      <Route path={PATH.Login} element={<Login />} />
      <Route path={PATH.PageNotFound} element={<PageNotFound />} />
    </Routes>
  )
}
