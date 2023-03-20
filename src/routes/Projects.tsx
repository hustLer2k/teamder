import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./Projects.module.css";
import ProjectsCatalogue from "../components/ProjectsCatalogue";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import ArrowedLink from "../components/ArrowedLink";
import { AiOutlineSearch } from "react-icons/ai";

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
    const [loading, setLoading] = useState(true);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const page = searchParams.get("page") || 0;
    const searchQuery = searchParams.get("searchQuery") || "";

    function getProjects() {
        setLoading(true);
        fetch(
            `https://teamder-dev.herokuapp.com/api/projects?page=${page}` +
                (searchQuery ? `&searchQuery=${searchQuery}` : "")
        )
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
    }

    useEffect(() => {
        getProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, page]);

    function handleSearch() {
        if (searchInputRef.current) {
            const searchQuery = searchInputRef.current.value.trim();
            setSearchParams({ searchQuery: searchQuery });
        }
    }

    return loading ? (
        <Spinner big={true} />
    ) : (
        <div className={styles.docker_container}>
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

            <nav className={styles.navigation}>
                <h2>Projects</h2>
                <div className={styles["search-bar"]}>
                    <input
                        type="text"
                        placeholder="Search"
                        ref={searchInputRef}
                    />
                    <button type="button" onClick={handleSearch}>
                        <AiOutlineSearch size={24} />
                    </button>
                </div>
            </nav>

            <ProjectsCatalogue projects={projects} />
            <Pagination
                baseLink={window.location.pathname}
                totalPages={totalPages}
                currentPage={+page}
            />
        </div>
    );
}
