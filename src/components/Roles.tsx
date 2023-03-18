import styles from "./Roles.module.css";

export default function Roles({
    roles,
    centerize = false,
}: {
    roles: string[];
    centerize?: boolean;
}) {
    return (
        <div
            className={`${styles["roles-container"]} ${
                centerize ? styles.centerize : ""
            }`}
        >
            {roles.map((role) => (
                <span key={role}>{role}</span>
            ))}
        </div>
    );
}
