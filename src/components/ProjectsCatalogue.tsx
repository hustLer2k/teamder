import styles from "./ProjectsCatalogue.module.css";
import type { Project } from "../routes/Projects";

// export interface Project {
//     avatarURLs: string[];
//     id: number;
//     name: string;
//     occupiedPlaces: number;
//     openedRoles: string[];
//     shortDescription: string;
//     teamSize: number;
// }

export default function ProjectsCatalogue({
    projects,
}: {
    projects: Project[];
}) {
    return (
        <div className={styles.projects}>
            {projects.map((project) => (
                <div className={styles.project} key={project.id}>
                    <div className={styles["left-side"]}>
                        <h3>{project.name}</h3>
                        <span>
                            {project.occupiedPlaces}/{project.teamSize}
                        </span>
                    </div>

                    <div className={styles["right-side"]}>
                        <p>{project.shortDescription}</p>
                        <div className={styles["roles-container"]}>
                            {project.openedRoles.map((role, i) => (
                                <span key={role}>{role}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
