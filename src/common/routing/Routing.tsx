import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components"
import { ProtectedRoute } from "@/common/ProtectedRoute/ProtectedRoute.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"

export const PATH = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  PageNotFound: "/*",
}

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={PATH.Main} element={<Main />} />
      </Route>
      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={PATH.Main} />}>
        <Route path={PATH.Login} element={<Login />} />
      </Route>
      <Route path={PATH.Faq} element={<h2>faq</h2>} />
      <Route path={PATH.PageNotFound} element={<PageNotFound />} />
    </Routes>
  )
}
