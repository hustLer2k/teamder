import useToken from "../hooks/useToken";
import { Outlet, useNavigation } from "react-router-dom";
import styles from "./Root.module.css";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

function App() {
    const [token] = useToken();
    const navigation = useNavigation();
    console.log(token);

    return (
        <div className={styles["root-container"]}>
            <Navbar />
            <main className={styles.main}>
                {navigation.state === "loading" ? (
                    <Spinner big={true} />
                ) : (
                    <Outlet />
                )}
            </main>
        </div>
    );
}

export default App;
