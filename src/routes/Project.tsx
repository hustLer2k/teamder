import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import styles from "./Project.module.css";

interface ProjectLoaderData {
    id: number;
    name: string;
    shortDescription: string;
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
    };
}

export default function Project() {
    const projectData = useLoaderData() as ProjectLoaderData;

    console.log(projectData);

    return <h2>Lol</h2>;
}

export async function projectLoader(args: LoaderFunctionArgs) {
    const projectId = args.params.projectId;
    return fetch(`https://teamder-dev.herokuapp.com/api/projects/${projectId}`);
}
