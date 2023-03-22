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
import useToken from "../hooks/useToken";
import { useState, useRef } from "react";
import UserEditForm from "../components/UserEditForm";
import AvatarEditor from "../components/AvatarEditor";
import Spinner from "../components/Spinner";

interface UserData {
    id: number;
    username: string;
    bio: string | undefined;
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
    const [token] = useToken();
    const [editing, setEditing] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const bioRef = useRef<HTMLParagraphElement>(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleEditing = () => setEditing((prevEditing) => !prevEditing);

    const userData = useLoaderData() as UserData;
    const [avatarURL, setAvatarURL] = useState(userData.avatarUrl || avatar);
    const curUserId = useSelector((state: RootState) => state.root.userId);

    let placeholder: JSX.Element;

    const ownPage = curUserId && userData.id === +curUserId;
    if (ownPage) {
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

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (avatarFile) formData.append("profilePicture", avatarFile);

        setLoading(true);
        setError("");
        fetch(
            `https://teamder-dev.herokuapp.com/api/users/profile/${userData.id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setError(data.message);
                } else {
                    setAvatarURL(data.avatarUrl);
                    toggleEditing();

                    if (bioRef.current) {
                        bioRef.current.textContent = data.bio;
                    }
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };
    const cancelHandler = () => toggleEditing();

    const avatarChangeHandler = (avatar: File) => setAvatarFile(avatar);

    const errorHandler = (err: string) => setError(err);

    return (
        <div className={styles["container"]}>
            <div className={styles["left"]}>
                <div className={styles["user-profile"]}>
                    {ownPage && editing ? (
                        <AvatarEditor
                            avatarUrl={avatarURL}
                            onAvatarChange={avatarChangeHandler}
                            onError={errorHandler}
                        />
                    ) : ownPage ? (
                        <Link to="/settings" title="Go to profile settings">
                            <img
                                className={styles["avatar"]}
                                src={avatarURL}
                                alt="Avatar"
                            />
                        </Link>
                    ) : (
                        <img
                            className={styles["avatar"]}
                            src={avatarURL}
                            alt="Avatar"
                        />
                    )}

                    <h3 className={styles["username"]}>{userData.username} </h3>
                    {userData.bio && (
                        <p className={styles["bio"]} ref={bioRef}>
                            {userData.bio}
                        </p>
                    )}
                </div>

                {ownPage && (
                    <button className={styles.edit} onClick={toggleEditing}>
                        Edit profile
                    </button>
                )}

                {loading && <Spinner />}
                {error && <p className={styles.error}>{error}</p>}

                {ownPage && editing && (
                    <UserEditForm
                        onSubmit={submitHandler}
                        onCancel={cancelHandler}
                        bio={userData.bio}
                    />
                )}
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

    if (!userId) return redirect("/");

    return fetch(
        `https://teamder-dev.herokuapp.com/api/users/profile/${userId}`
    );
}
