import styles from "./Dashboard.module.css";
import { NavLink, Outlet } from "react-router-dom";

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
