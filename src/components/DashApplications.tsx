import styles from "./DashApplications.module.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import formatDate from "../lib/format_date";
import type { ProjectApplication } from "../routes/DashboardProjects";
import { useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

export default function DashApplications({
    applications,
    token,
    onRemove,
}: {
    applications: ProjectApplication[];
    token: string;
    onRemove: (applicationId: number) => void;
}) {
    const alwaysDisplay = applications.length < 5;
    const [show, setShow] = useState(false);

    const Arrow = show ? AiOutlineArrowUp : AiOutlineArrowDown;
    const toggleShow = () => setShow((prevState) => !prevState);

    const processApplication = async (id: number, accept: boolean) => {
        const response = await fetch(
            `https://teamder-dev.herokuapp.com/api/applications/${id}?decision=${
                accept ? "ACCEPTED" : "REJECTED"
            }`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            onRemove(id);
        } else {
            console.error(response.status, response.statusText);
        }
    };

    return (
        <div className={styles.applications}>
            {!alwaysDisplay && (
                <button className={styles["show-toggler"]} onClick={toggleShow}>
                    Show applications <Arrow size={24} />
                </button>
            )}
            {(alwaysDisplay || show) &&
                applications.map((application) => (
                    <div className={styles.application} key={application.id}>
                        <h3>{application.username}</h3>
                        <p>{formatDate(application.applicationDate)}</p>
                        <p>{application.applicantMessage}</p>
                        <p>{application.role}</p>

                        <div className={styles.controls}>
                            <button
                                onClick={() =>
                                    processApplication(application.id, true)
                                }
                            >
                                {
                                    <AiOutlineCheck
                                        size={36}
                                        className={styles.accept}
                                    />
                                }
                            </button>
                            <button
                                onClick={() =>
                                    processApplication(application.id, false)
                                }
                            >
                                {
                                    <AiOutlineClose
                                        size={36}
                                        className={styles.reject}
                                    />
                                }
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
}
