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
import ArrowedLink from "../components/ArrowedLink";
import { AiOutlineStar } from "react-icons/ai";

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
                <ArrowedLink
                    to="/project/create"
                    text="Create your first project"
                />
            </div>
        );
    } else {
        placeholder = (
            <h2 className={styles.placeholder}>
                {userData.username} doesn't have any projects yet
            </h2>
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
                    {userData.bio && (
                        <p className={styles["bio"]}>{userData.bio}</p>
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

                                        {project.isOwner && (
                                            <span
                                                className={styles.star}
                                                title="Owns the project"
                                            >
                                                <AiOutlineStar size={24} />{" "}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    placeholder
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
