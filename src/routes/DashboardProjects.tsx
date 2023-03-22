import styles from "./DashboardProjects.module.css";
import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ArrowedLink from "../components/ArrowedLink";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";

interface ProjectType {
    projectId: number;
    projectTitle: string;
    isOwner: boolean;
    role: string;
    shortDescription: string;
}

export default function DashboardProjects() {
    const navigate = useNavigate();
    const [token, _, userId] = useToken();
    const [showAll, setShowAll] = useState(false);
    const [projects, setProjects] = useState([] as ProjectType[]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const totalPages = Math.ceil(projects.length / 10);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || "0";

    useEffect(() => {
        if (!token || !userId) return;

        setLoading(true);
        fetch(`https://teamder-dev.herokuapp.com/api/users/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
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
                setProjects(data.participations);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token, userId]);

    const handleCheck = () => setShowAll((prevShowAll) => !prevShowAll);

    const switcherText = showAll
        ? "Show only your projects"
        : "Show all projects";

    return loading ? (
        <Spinner big />
    ) : (
        <>
            <h2 className="dashboard_header">My Projects</h2>
            {error && <p className="error">{error}</p>}
            <div className="dashboard_wrapper">
                <header className={styles.container}>
                    <h3 className={`${styles.item} ${styles.header_item}`}>
                        Project Name
                    </h3>
                    <h3 className={`${styles.item} ${styles.header_item}`}>
                        Description
                    </h3>
                    <h3 className={`${styles.item} ${styles.header_item}`}>
                        Role
                    </h3>
                    <h3
                        className={`${styles.item} ${styles.header_item} ${styles.switcher}`}
                        onClick={handleCheck}
                        role="button"
                    >
                        {switcherText}
                    </h3>
                </header>

                {projects.slice(+page * 10, (+page + 1) * 10).map((project) => {
                    if (!showAll && !project.isOwner) return null;

                    const linkStyle = !project.isOwner ? styles.not_owns : "";
                    const linkText = project.isOwner ? "Manage" : "View";
                    const linkHref = project.isOwner
                        ? project.projectId.toString()
                        : `/projects/${project.projectId}`;

                    return (
                        <div
                            key={project.projectId}
                            className={styles.container}
                        >
                            <div className={styles.item}>
                                <h4>{project.projectTitle}</h4>
                            </div>
                            <div className={styles.item}>
                                <p>{project.shortDescription}</p>
                            </div>
                            <div className={styles.item}>
                                <p>{project.role}</p>
                            </div>
                            <div className={styles.item}>
                                <ArrowedLink
                                    to={linkHref}
                                    text={linkText}
                                    className={linkStyle}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <Pagination
                baseLink={window.location.pathname}
                totalPages={totalPages}
                currentPage={+page}
            />
        </>
    );
}
