import { createRoot } from "react-dom/client"
import { App } from "./app/App.tsx"
import { Provider } from "react-redux"
import { store } from "./app/store.ts"
import { HashRouter } from "react-router"

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
)
