import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Projects.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import ProjectsCatalogue from "../components/ProjectsCatalogue";
import Pagination from "../components/Pagination";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
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
            .catch((error) => console.error(error));
    }, [searchParams]);

    console.log(projects);
    console.log(totalPages);

    return (
        <div className={styles.container}>
            <div className={styles.helper}>
                <h2>Create a new project or join an existing one</h2>
                <p>Here are the latest enterprise level projects</p>
                <Link to="create">
                    Create a new project <AiOutlineArrowRight size={24} />
                </Link>
            </div>

            <ProjectsCatalogue projects={projects} />
            <Pagination
                baseLink={location.pathname}
                totalPages={totalPages}
                currentPage={+page}
            />
        </div>
    );
}
