import { Link } from "react-router-dom";
import useToken from "./hooks/useToken";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import logo from "../public/avatar.svg";
import Navbar from "./components/Navbar";

function App() {
    const [token] = useToken();

    return (
        <div className={styles["root-container"]}>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
