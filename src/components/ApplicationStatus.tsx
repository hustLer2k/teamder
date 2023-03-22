import styles from "./ApplicationStatus.module.css";
import type { ApplicationStatuses } from "./Application";

export default function ApplicationStatus({
    status,
}: {
    status: ApplicationStatuses;
}) {
    let statusText: string;

    switch (status) {
        case "REJECTED":
            statusText = "Rejected";
            break;
        case "ACCEPTED":
            statusText = "Accepted";
            break;
        case "WAITING_FOR_REVIEW":
            statusText = "Pending";
            break;
    }

    return <p className={`${styles[status]} ${styles.status}`}>{statusText}</p>;
}
