import {createRoot} from 'react-dom/client'
import './index.css'
import {App} from './app/App.tsx'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {StrictMode} from "react";



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>,
    </StrictMode>
)
