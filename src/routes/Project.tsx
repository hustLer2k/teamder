import { LoaderFunctionArgs, useLoaderData, Link } from "react-router-dom";
import styles from "./Project.module.css";
import { useState } from "react";
import UserCard from "../components/UserCard";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import Roles from "../components/Roles";

export interface ProjectLoaderData {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    occupiedPlaces: number;
    openedRoles: { id: number; name: string }[];
    ownerId: number;
    publishedAt: string;
    teamSize: number;
    teamMembers: {
        profilePictureURL: string | null;
        roleName: string;
        userId: number;
        username: string;
    }[];
}

export default function Project() {
    const project = useLoaderData() as ProjectLoaderData;

    const publishedAt = new Date(project.publishedAt);
    const ownerUsername = project.teamMembers.find(
        (member) => member.userId === project.ownerId
    )?.username;
    const openedRolesNames = project.openedRoles.map((role) => role.name);

    const [showApplyForm, setShowApplyForm] = useState(false);
    const toggleApplyForm = () => setShowApplyForm((prevState) => !prevState);
    const Arrow = showApplyForm ? AiOutlineArrowUp : AiOutlineArrowDown;

    return (
        <div className={styles.container}>
            <header>
                <h2>{project.name}</h2>
                <span>
                    {ownerUsername}
                    <br />
                    {publishedAt.toLocaleDateString()}
                </span>
            </header>

            <p className={styles["short-description"]}>
                {project.shortDescription}
            </p>

            <p className={styles["description"]}>{project.description}</p>

            {openedRolesNames.length && (
                <div className={styles["opened-roles"]}>
                    <h3>Opened roles</h3>
                    <Roles roles={openedRolesNames} centerize={true} />
                    <button
                        className={styles["apply-toggler"]}
                        onClick={toggleApplyForm}
                    >
                        Apply <Arrow size={24} />
                    </button>
                </div>
            )}

            <div className={styles.team}>
                <h3>Team</h3>
                <div className={styles["team-members"]}>
                    {project.teamMembers.map((member) => (
                        <UserCard
                            key={member.userId}
                            userId={member.userId}
                            profilePictureUrl={member.profilePictureURL}
                            username={member.username}
                            role={member.roleName}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function projectLoader(args: LoaderFunctionArgs) {
    const projectId = args.params.projectId;
    return fetch(`https://teamder-dev.herokuapp.com/api/projects/${projectId}`);
}
