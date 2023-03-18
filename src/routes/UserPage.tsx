import styles from "./UserPage.module.css";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import avatar from "../assets/avatar.svg";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";

export default function UserPage() {
    const userData = useLoaderData();

    console.log(userData);

    return <section></section>;
}

export async function userLoader(args: LoaderFunctionArgs) {
    const { userId } = args.params;

    if (!userId) return redirect("/");

    return fetch(
        `https://teamder-dev.herokuapp.com/users/${userId}/dashboard/projects`
    );
}
