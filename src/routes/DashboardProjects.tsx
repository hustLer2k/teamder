import styles from "./DashboardProjects.module.css";
import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ArrowedLink from "../components/ArrowedLink";
import { Link } from "react-router-dom";

interface MicroProject {
    id: number;
    name: string;
}

export default function DashboardProjects() {
    const navigate = useNavigate();
    const [token] = useToken();

    const [projects, setProjects] = useState([] as MicroProject[]);
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        fetch(
            "https://teamder-dev.herokuapp.com/api/users/xd/dashboard/projects?size=2281337",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        )
            .then((res) => {
                if (
                    res.ok &&
                    res.headers.get("Content-Type") === "application/json"
                ) {
                    return res.json();
                } else {
                    throw new Error(res.statusText || "Something went wrong");
                }
            })
            .then((data) => {
                setProjects(data.content);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    if (!token) {
        navigate("/signin");
        return <h2>Redirecting...</h2>;
    }

    return loading ? (
        <Spinner big />
    ) : (
        <>
            <h2 className="dashboard_header">My Projects</h2>
            <div className="dashboard_wrapper">
                <header className={styles.container}>
                    <h3 className={`${styles.item} ${styles.header_item}`}>
                        Project Name
                    </h3>
                    <h3 className={`${styles.item} ${styles.header_item}`}>
                        Publication date
                    </h3>
                    <h3 className={`${styles.item} ${styles.header_item}`}>
                        Role
                    </h3>
                    <h3 className={`${styles.item} ${styles.header_item}`}></h3>
                </header>

                {error && <p className="error">{error}</p>}

                {projects.map((project) => (
                    <div key={project.id} className={styles.container}>
                        <div className={styles.item}>
                            <h4>{project.name}</h4>
                        </div>
                        <div className={styles.item}>
                            <ArrowedLink
                                to={`${project.id}`}
                                text="View applications"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
