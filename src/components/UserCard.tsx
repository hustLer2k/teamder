import styles from "./UserCard.module.css";
import defaultAvatar from "../assets/avatar.svg";
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
    const children = (
        <>
            <img src={profilePictureUrl || defaultAvatar} alt="Profile" />
            {username && <p>{username}</p>}
            {role && <h4>{role}</h4>}
        </>
    );

    if (window.location.pathname.startsWith("/users")) {
        return <div className={styles.card}>{children}</div>;
    } else {
        return (
            <Link to={`/users/${userId}`} className={styles.card}>
                {children}
            </Link>
        );
    }
}
