import styles from "./UserPage.module.css";
import avatar from "../assets/avatar.svg";
import {
    LoaderFunctionArgs,
    redirect,
    useLoaderData,
    Link,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface UserData {
    id: number;
    username: string;
    bio: string | null;
    avatarUrl: string | null;
    resumeUrl: string | null;
    participations: {
        projectId: number;
        projectTitle: string;
        shortDescription: string;
        isOwner: boolean;
        role: string;
    }[];
}

export default function UserPage() {
    const userData = useLoaderData() as UserData;
    const curUserId = useSelector((state: RootState) => state.userId);

    console.log(userData);

    let placeholder: JSX.Element;

    if (curUserId && userData.id === +curUserId) {
        placeholder = (
            <div className={styles.placeholder}>
                <h2>You don't have any projects yet</h2>
                <Link to="/projects/create">Create </Link>
            </div>
        );
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["left"]}>
                <div className={styles["user-profile"]}>
                    <img
                        className={styles["avatar"]}
                        src={userData.avatarUrl || avatar}
                        alt="User Avatar"
                    />
                    <h3 className={styles["username"]}>{userData.username}</h3>
                    {true && (
                        <p className={styles["bio"]}>
                            Computer Science Student at the Wrocław University
                            of Science and Technology.
                        </p>
                    )}
                </div>
            </div>

            <div className={styles["right"]}>
                {userData.participations.length ? (
                    <div className={styles["user-projects"]}>
                        <h2 className={styles["section-heading"]}>Projects</h2>
                        <ul className={styles["project-list"]}>
                            {userData.participations.map((project) => (
                                <li
                                    className={styles["project-item"]}
                                    key={project.projectId}
                                >
                                    <Link to={`/projects/${project.projectId}`}>
                                        <h3 className={styles["project-title"]}>
                                            {project.projectTitle}
                                        </h3>
                                        <p
                                            className={
                                                styles["project-description"]
                                            }
                                        >
                                            {project.shortDescription}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h2>{userData.username} doesn't have any projects yet</h2>
                )}
            </div>
        </div>
    );
}

export async function userLoader(args: LoaderFunctionArgs) {
    const { userId } = args.params;
    console.log(userId);

    if (!userId) return redirect("/");

    return fetch(
        `https://teamder-dev.herokuapp.com/api/users/profile/${userId}`
    );
}
