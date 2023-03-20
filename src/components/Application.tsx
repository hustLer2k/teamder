import styles from "./Application.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { remove } from "../store/store";
import { RootState } from "../store/store";
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";

export interface ApplicationType {
    id: number;
    message: string;
    role: string;
    CVUrl: string;
    date: string;
    status: "REJECTED" | "ACCEPTED" | "WAITING_FOR_REVIEW";
    projectName?: string;
    projectId?: number;
}

export default function Application({
    id,
    message,
    role,
    CVUrl,
    date,
    status,
}: ApplicationType) {
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.root.token);

    const UTCDate = new Date(
        Date.UTC(
            parseInt(date.slice(0, 4)), // Year
            parseInt(date.slice(5, 7)) - 1, // Month (0-based)
            parseInt(date.slice(8, 10)), // Day
            parseInt(date.slice(11, 13)), // Hour
            parseInt(date.slice(14, 16)), // Minute
            parseInt(date.slice(17, 19)) // Second
        )
    );

    const formattedDate = new Intl.DateTimeFormat(undefined, {
        hour12: false,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(UTCDate));

    const statusClass =
        status === "REJECTED" ? styles.rejected : styles.pending;

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
            <HiOutlineTrash size={28} onClick={handleDelete} />

            {id}

            {error && <p className={styles.error}>{error}</p>}

            <div>
                <h4>Message</h4> <p>{message}</p>
            </div>
            <div>
                <h4>Role</h4> <p>{role}</p>
            </div>
            <div>
                <h4>Date</h4> <p>{formattedDate}</p>
            </div>
            <div>
                <h4>Status</h4> <p className={statusClass}>{status}</p>
            </div>
        </div>
    );
}
