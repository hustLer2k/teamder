import styles from "./Dashboard.module.css";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Application from "../components/Application";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <section className={styles.applications}>
            <nav>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `${styles["nav-link"]} ${isActive ? styles.active : ""}`
                    }
                >
                    Applications
                </NavLink>

                <NavLink
                    to="projects"
                    className={({ isActive }) =>
                        `${styles["nav-link"]} ${isActive ? styles.active : ""}`
                    }
                >
                    Projects
                </NavLink>
            </nav>

            <Outlet />
        </section>
    );
}
