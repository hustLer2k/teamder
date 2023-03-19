import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import ProjectsCatalogue from "../components/ProjectsCatalogue";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import ArrowedLink from "../components/ArrowedLink";

export interface Project {
    avatarURLs: string[];
    id: number;
    name: string;
    occupiedPlaces: number;
    openedRoles: string[];
    shortDescription: string;
    teamSize: number;
}

export default function Projects() {
    const [searchParams] = useSearchParams();
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const page = searchParams.get("page") || 0;

    useEffect(() => {
        fetch(`https://teamder-dev.herokuapp.com/api/projects?page=${page}`)
            .then((response) => {
                if (
                    !response.ok ||
                    response.headers.get("Content-Type") !== "application/json"
                )
                    throw new Error(response.statusText);

                return response.json();
            })
            .then((projects) => {
                setProjects(projects.content);
                setTotalPages(projects.totalPages);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [searchParams, page]);

    return loading ? (
        <Spinner big={true} />
    ) : (
        <div className={styles.container}>
            <div className={styles.helper}>
                <h2>Create a new project or join an existing one</h2>
                <p>Here are the latest enterprise level projects</p>
                <ArrowedLink
                    to="create"
                    text="Create a project"
                    size={24}
                    className={styles["create-project"]}
                />
            </div>

            <ProjectsCatalogue projects={projects} />
            <Pagination
                baseLink={window.location.pathname}
                totalPages={totalPages}
                currentPage={+page}
            />
        </div>
    );
}
