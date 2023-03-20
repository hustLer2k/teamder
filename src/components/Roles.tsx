import styles from "./Roles.module.css";
import { TiDelete } from "react-icons/ti";

export default function Roles({
    roles,
    centerize = false,
    onRoleDelete,
}: {
    roles: string[];
    centerize?: boolean;
    onRoleDelete?: (roleIndex: number) => void;
}) {
    return (
        <div
            className={`${styles["roles-container"]} ${
                centerize ? styles.centerize : ""
            }`}
        >
            {roles.map((role, i) => (
                <span key={i} onClick={() => onRoleDelete?.(i)}>
                    {role}
                    {onRoleDelete && <TiDelete size={16} />}
                </span>
            ))}
        </div>
    );
}
