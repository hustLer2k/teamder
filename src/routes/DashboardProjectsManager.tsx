import { useState } from "react";
import styles from "./DashboardProjectsManager.module.css";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import applicationStyles from "../components/Application.module.css";

export interface ProjectApplication {
    id: number;
    username: string;
    contact: string;
    applicantMessage: string;
    role: string;
    resumeURL: string;
    applicationDate: string;
}

export default function DashboardProjectsManager() {
    const [token] = useToken();
    const [error, setError] = useState("");
    const { projectId } = useParams();

    const [projectApplications, setProjectApplications] = useState(
        [] as ProjectApplication[]
    );

    async function fetchApplications() {
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

                setProjectApplications(data.content);
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

    return projectApplications.length ? (
        <h2>No applications yet</h2>
    ) : (
        <>
            <h2 className="dashboard_header">Applications</h2>
            <div className="dashboard_wrapper">
                {projectApplications.map((projectApplication) => (
                    <div
                        key={projectApplication.id}
                        className={styles.application}
                    >
                        <h3>{projectApplication.username}</h3>
                    </div>
                ))}
            </div>
        </>
    );
}
