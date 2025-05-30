import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button"
import { Link } from "react-router"
import { PATH } from "@/common/routing/Routing.tsx"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <div className={styles.homeButtonWrapper}>
      <Button variant={"contained"} component={Link} to={PATH.Main}>
        На главную стрницу
      </Button>
    </div>
  </>
)
