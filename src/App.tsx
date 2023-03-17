import useToken from "./hooks/useToken";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./components/Navbar";

function App() {
    const [token] = useToken();

    return (
        <div className={styles["root-container"]}>
            <Navbar />
            {token}
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
