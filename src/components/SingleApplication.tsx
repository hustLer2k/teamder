import styles from "./SingleApplication.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { remove } from "../store/store";
import { RootState } from "../store/store";
import { HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";
import { ApplicationType } from "./Application";
import formatDate from "../lib/format_date";

import { useNavigate } from "react-router-dom";

export default function Application({
    id,
    message,
    role,
    CVUrl,
    date,
    status,
}: ApplicationType) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.root.token);

    const formattedDate = formatDate(date);

    const statusClass =
        status === "REJECTED" ? styles.rejected : styles.pending;
    const statusText = status === "REJECTED" ? "Rejected" : "Pending";

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
                    navigate("");
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch((err) => setError(err.message || "Something went wrong"));
    };

    return (
        <div className={styles.container}>
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
                <h4>Status</h4> <p className={statusClass}>{statusText}</p>
            </div>
            <HiOutlineTrash size={28} onClick={handleDelete} />
        </div>
    );
}
