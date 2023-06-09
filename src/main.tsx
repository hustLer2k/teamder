import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/inter";
import "@fontsource/inter/800.css";

import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

import ErrorPage from "./routes/ErrorPage";
import SignUp from "./routes/Signin";
import Projects from "./routes/Projects";
import Project, { projectLoader } from "./routes/Project";
import UserPage, { userLoader } from "./routes/UserPage";
import CreateProject from "./routes/CreateProject";
import Dashboard from "./routes/Dashboard";
import DashboardApplications from "./routes/DashboardApplications";
import DashboardProjects from "./routes/DashboardProjects";
import UserSettings from "./routes/UserSettings";
import DashboardProjectsManager from "./routes/DashboardProjectsManager";
import Home from "./routes/Home";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
                <Route errorElement={<ErrorPage />}>
                    <Route index element={<Home />} />
                    <Route path="signin" element={<SignUp />} />
                    <Route path="dashboard" element={<Dashboard />}>
                        <Route index element={<DashboardApplications />} />
                        <Route
                            path="projects"
                            element={<DashboardProjects />}
                        />
                        <Route
                            path="projects/:projectId"
                            element={<DashboardProjectsManager />}
                        />
                    </Route>
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/create" element={<CreateProject />} />
                    <Route path="settings" element={<UserSettings />} />
                    <Route
                        path="projects/:projectId"
                        element={<Project />}
                        loader={projectLoader}
                    />
                    <Route
                        path="users/:userId"
                        element={<UserPage />}
                        loader={userLoader}
                    />
                </Route>
            </Route>
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
