import styles from "./DashboardProjects.module.css";
import { useState, useEffect } from "react";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import DashApplications from "../components/DashApplications";

interface MicroProject {
    id: number;
    name: string;
}

export interface ProjectApplication {
    id: number;
    username: string;
    contact: string;
    applicantMessage: string;
    role: string;
    resumeURL: string;
    applicationDate: string;
}

interface ProjectApplications {
    [id: string]: ProjectApplication[];
}

export default function DashboardProjects() {
    const navigate = useNavigate();
    const [token] = useToken();

    const [projects, setProjects] = useState([] as MicroProject[]);
    const [projectApplications, setProjectApplications] = useState(
        {} as ProjectApplications
    );
    const [loading, setLoading] = useState(false);

    async function fetchApplications(projectId: number) {
        try {
            const res = await fetch(
                `https://teamder-dev.herokuapp.com/api/projects/${projectId}/applications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            if (
                res.ok &&
                res.headers.get("Content-Type") === "application/json"
            ) {
                const data = await res.json();

                projectId in projectApplications
                    ? projectApplications[projectId].push(...data.content)
                    : (projectApplications[projectId] = [...data.content]);
            } else {
                throw new Error(res.statusText || "Something went wrong");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.error(err.message);
            }
        }
    }

    function removeApplication(projectId: number, applicationId: number) {
        const newApplications = projectApplications[projectId].filter(
            (app) => app.id !== applicationId
        );

        setProjectApplications({
            ...projectApplications,
            [projectId]: newApplications,
        });
    }

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

                const promises: Promise<void>[] = [];
                data.content.forEach((project: MicroProject) => {
                    promises.push(fetchApplications(project.id));
                });

                Promise.all(promises).then(() => setLoading(false));
            })
            .catch((err) => setError(err.message));
    }, [token]);

    if (!token) {
        navigate("/signin");
        return;
    }

    return loading ? (
        <Spinner big />
    ) : (
        <div className={styles.projects}>
            {projects.map((project) => (
                <div key={project.id} className={styles.project}>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>

                    <DashApplications
                        onRemove={removeApplication.bind(null, project.id)}
                        applications={projectApplications[project.id]}
                        token={token}
                    />
                </div>
            ))}
        </div>
    );
}
