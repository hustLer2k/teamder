import styles from "./Application.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { remove } from "../store/store";
import { RootState } from "../store/store";
import { useState } from "react";
import formatDate from "../lib/format_date";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import ApplicationStatus from "./ApplicationStatus";

export type ApplicationStatuses =
    | "REJECTED"
    | "ACCEPTED"
    | "WAITING_FOR_REVIEW";

export interface ApplicationType {
    id: number;
    message: string;
    role: string;
    CVUrl: string;
    date: string;
    status: ApplicationStatuses;
    projectId: number;
    projectName?: string;
}

export default function Application({
    id,
    message,
    role,
    CVUrl,
    date,
    status,
    projectName,
    projectId,
}: ApplicationType) {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.root.token);

    const formattedDate = formatDate(date);

    const handleDelete = () => {
        fetch(`https://teamder-dev.herokuapp.com/api/applications/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    dispatch(remove(id));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch((err) => setError(err.message || "Something went wrong"));
    };

    return (
        <div className={styles.container}>
            {error && <p className={styles.error}>{error}</p>}

            {projectName && (
                <div className={styles.item}>
                    <h4>{projectName}</h4>
                </div>
            )}

            <div className={styles.item}>
                <p>{message}</p>
            </div>
            <div className={styles.item}>
                <p>{role}</p>
            </div>
            <div className={styles.item}>
                <p>{formattedDate}</p>
            </div>
            <div className={styles.item}>
                <ApplicationStatus status={status} />
            </div>
            <div className={`${styles.controls} ${styles.item}`}>
                <button>
                    <AiOutlineEdit size={36} />
                </button>
                <button>
                    <HiOutlineTrash size={36} />
                </button>
            </div>
        </div>
    );
}
