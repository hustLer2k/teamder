import styles from "./UserPage.module.css";
import UserCard from "../components/UserCard";
import avatar from "../assets/avatar.svg";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function UserPage() {
    const userData = useLoaderData();
    const curUserId = useSelector((state: RootState) => state.userId);

    console.log(userData);

    return <section>{curUserId}</section>;
}

export async function userLoader(args: LoaderFunctionArgs) {
    const { userId } = args.params;
    console.log(userId);

    if (!userId) return redirect("/");

    return fetch(
        `https://teamder-dev.herokuapp.com/users/${userId}/dashboard/projects`
    );
}
