import styles from "./Dashboard.module.css";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Application from "../components/Application";
import { NavLink, Outlet } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Dashboard() {
    return (
        <section className={styles.dashboard}>
            <nav>
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `${styles["nav-link"]} ${isActive ? styles.active : ""}`
                    }
                >
                    Applications
                </NavLink>

                <NavLink
                    to="/dashboard/projects"
                    className={({ isActive }) =>
                        `${styles["nav-link"]} ${isActive ? styles.active : ""}`
                    }
                >
                    Projects
                </NavLink>
            </nav>

            <div className={styles.content}>
                <Outlet />
            </div>
        </section>
    );
}
