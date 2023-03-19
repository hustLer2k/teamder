import styles from "./Application.module.css";

export interface ApplicationType {
    id: number;
    message: string;
    role: string;
    CVUrl: string;
    date: string;
    projectName?: string;
    projectId?: number;
}

export default function Application({
    message,
    role,
    CVUrl,
    date,
}: {
    message: string;
    role: string;
    CVUrl: string;
    date: string;
}) {
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

    return (
        <div className={styles.container}>
            <div>
                <h4>Message</h4> <p>{message}</p>
            </div>
            <div>
                <h4>Role</h4> <p>{role}</p>
            </div>
            <div>
                <h4>Date</h4> <p>{formattedDate}</p>
            </div>
        </div>
    );
}
