import styles from "./UserCard.module.css";
import avatar from "../assets/avatar.svg";
import { Link } from "react-router-dom";

export default function UserCard({
    profilePictureUrl,
    username,
    role,
    userId,
}: {
    profilePictureUrl: string | null;
    userId: string | number;
    username?: string;
    role?: string;
}) {
    let Tag: JSX.Element | null = null;

    const children = (
        <>
            <img src={profilePictureUrl || avatar} alt="Profile picture" />
            {username && <p>{username}</p>}
            {role && <h4>{role}</h4>}
        </>
    );

    if (location.pathname.startsWith("/users")) {
        return <div className={styles.card}>{children}</div>;
    } else {
        return (
            <Link to={`/users/${userId}`} className={styles.card}>
                {children}
            </Link>
        );
    }
}
