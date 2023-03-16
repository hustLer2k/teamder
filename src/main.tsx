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
import SignUp from "./routes/Signup";
import "./index.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />
            <Route path="signup" element={<SignUp />} />
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
