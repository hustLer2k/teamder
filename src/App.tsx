import { useState } from "react";
import { Link } from "react-router-dom";
import useToken from "./hooks/useToken";
import { Outlet } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);
    const [token] = useToken();

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>{token}</p>
            </div>
            <Link to="/signin">Sign in</Link>
            <Outlet />
        </div>
    );
}

export default App;
