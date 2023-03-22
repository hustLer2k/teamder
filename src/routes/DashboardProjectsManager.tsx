import { useState, useEffect } from "react";
import styles from "./DashboardProjectsManager.module.css";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useToken";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import applicationStyles from "../components/Application.module.css";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import formatDate from "../lib/format_date";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

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
    const [loading, setLoading] = useState(false);

    const [projectApplications, setProjectApplications] = useState(
        [] as ProjectApplication[]
    );
    const [projectTitle, setProjectTitle] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || 0;

    async function fetchApplications() {
        try {
            const res = await fetch(
                `https://teamder-dev.herokuapp.com/api/projects/${projectId}/applications?page=${page}`,
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
                console.log(data);

                setProjectApplications(data.content);
                setTotalPages(data.totalPages);
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

    async function fetchProjectTitle() {
        try {
            const res = await fetch(
                `https://teamder-dev.herokuapp.com/api/projects/${projectId}`,
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

                setProjectTitle(data.name);
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

    useEffect(() => {
        if (!token) return;

        setLoading(true);
        Promise.all([fetchApplications(), fetchProjectTitle()]).finally(() =>
            setLoading(false)
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    console.log(projectApplications);

    async function processApplication(applicationId: number, accept: boolean) {
        try {
            const response = await fetch(
                `https://teamder-dev.herokuapp.com/api/applications/${applicationId}?decision=${
                    accept ? "ACCEPTED" : "REJECTED"
                }`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(response.statusText || "Something went wrong");
            }

            console.log(applicationId);
            console.log(
                projectApplications.filter(
                    (projectApplication) =>
                        projectApplication.id !== applicationId
                )
            );

            setProjectApplications((prev) =>
                prev.filter(
                    (projectApplication) =>
                        projectApplication.id !== applicationId
                )
            );
        } catch (err) {
            setError((err as Error).message);
        }
    }

    // TODO: use proper keys after the issue https://github.com/artsiomshshshsk/teamder/issues/7 is fixed

    return loading ? (
        <Spinner big />
    ) : !projectApplications.length ? (
        <h2>No applications yet</h2>
    ) : (
        <>
            <h2 className="dashboard_header">
                <Link
                    className={styles.project_link}
                    to={`/projects/${projectId}`}
                >
                    {projectTitle}
                </Link>
                Applications
            </h2>
            {error && <p className="error">{error}</p>}

            <div className="dashboard_wrapper">
                <header className={applicationStyles.container}>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        username
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Date
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Message
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Role
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Resume
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Controls
                    </h3>
                </header>

                {projectApplications.map((projectApplication) => (
                    <div
                        key={Math.random()}
                        className={applicationStyles.container}
                    >
                        <div className={applicationStyles.item}>
                            <h3 className={`{applicationStyles.item}`}>
                                {projectApplication.username}
                            </h3>
                        </div>

                        <div className={applicationStyles.item}>
                            <p>{projectApplication.applicantMessage}</p>
                        </div>
                        <div className={applicationStyles.item}>
                            <p className={styles.role}>
                                {projectApplication.role}
                            </p>
                        </div>
                        <div className={applicationStyles.item}>
                            <p>
                                {formatDate(projectApplication.applicationDate)}
                            </p>
                        </div>
                        <div className={applicationStyles.item}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className={styles.resume_link}
                                href={
                                    projectApplication.resumeURL ||
                                    "https://find-my-project-bucket.s3.eu-central-1.amazonaws.com/my-buck/3180143f-dd12-42c3-9e47-775859b295d8.pdf"
                                }
                            >
                                View resume
                            </a>
                        </div>
                        <div
                            className={`${applicationStyles.controls} ${applicationStyles.item}`}
                        >
                            <button
                                onClick={() =>
                                    processApplication(
                                        projectApplication.id,
                                        true
                                    )
                                }
                            >
                                <FiCheck className={styles.accept} size={36} />
                            </button>
                            <button
                                onClick={() =>
                                    processApplication(
                                        projectApplication.id,
                                        false
                                    )
                                }
                            >
                                <RxCross2 className={styles.reject} size={36} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                baseLink={window.location.pathname}
                totalPages={totalPages}
                currentPage={+page}
            />
        </>
    );
}
