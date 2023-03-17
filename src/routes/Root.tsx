import useToken from "../hooks/useToken";
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Navbar from "../components/Navbar";

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
