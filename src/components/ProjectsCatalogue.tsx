import styles from "./ProjectsCatalogue.module.css";
import type { Project } from "../routes/Projects";
import Roles from "./Roles";
import { Link } from "react-router-dom";
import AvatarSlideshow from "./AvatarSlideshow";

export default function ProjectsCatalogue({
    projects,
}: {
    projects: Project[];
}) {
    return (
        <div className={styles.projects}>
            {projects.map((project) => (
                <Link
                    to={project.id.toString()}
                    className={styles.project}
                    key={project.id}
                >
                    <div className={styles["left-side"]}>
                        <h3>{project.name}</h3>
                        <span>
                            {project.occupiedPlaces}/{project.teamSize}
                        </span>
                    </div>

                    <div className={styles["right-side"]}>
                        <p>{project.shortDescription}</p>
                        {/* <AvatarSlideshow avatars={project.avatarURLs} /> */}
                        <Roles roles={project.openedRoles} />
                    </div>
                </Link>
            ))}
        </div>
    );
}
