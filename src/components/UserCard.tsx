import styles from "./UserCard.module.css";
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
            <img
                src={
                    profilePictureUrl ||
                    "https://teamder-dev.herokuapp.com/api/mock/img"
                }
                alt="Profile"
            />
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
