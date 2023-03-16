import { Link } from "react-router-dom";
import useToken from "./hooks/useToken";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import logo from "../public/avatar.svg";

function App() {
    const [token] = useToken();

    return (
        <>
            <nav className={styles["navbar"]}>
                <div className={styles["left-side"]}>
                    <img src={logo} alt="logo" className={styles["logo"]} />
                    <h2 className={styles["header"]}>Teamder</h2>
                    <a href="#" className={styles["nav-link"]}>
                        Link 1
                    </a>
                    <a href="#" className={styles["nav-link"]}>
                        Link 2
                    </a>
                </div>
                <div className={styles["right-side"]}>
                    <a href="#" className={styles["nav-link"]}>
                        Sign In
                    </a>
                    <a href="#" className={styles["nav-link"]}>
                        Sign Up
                    </a>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
