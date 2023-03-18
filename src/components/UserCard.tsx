import styles from "./UserCard.module.css";
import avatar from "../assets/avatar.svg";
import { Link } from "react-router-dom";

export default function UserCard({
    profilePictureUrl,
    username,
    role,
    userId
}: {
    profilePictureUrl: string | null;
    userId: string | number;
    username?: string;
    role?: string;
}) {
    return (
        <Link to={`/users/${userId}`} className={styles.card}>
            <img src={profilePictureUrl || avatar} alt="Profile picture" />
            {username && <p>{username}</p>}
            {role && <h4>{role}</h4>}
        </Link>
    );
}
