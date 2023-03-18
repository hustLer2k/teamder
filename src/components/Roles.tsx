import styles from "./Roles.module.css";

export default function Roles({ roles }: { roles: string[] }) {
    return (
        <div className={styles["roles-container"]}>
            {roles.map((role) => (
                <span key={role}>{role}</span>
            ))}
        </div>
    );
}
