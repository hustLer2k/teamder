import "@fontsource/open-sans";
import "@fontsource/roboto";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    Routes,
} from "react-router-dom";
import SignUp from "./routes/Signin";
import "./index.css";
import { store } from './store/store';
import { Provider } from "react-redux";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="signin" element={<SignUp />} />
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
