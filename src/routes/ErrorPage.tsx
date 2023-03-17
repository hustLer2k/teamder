import { Link, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
    const error = useRouteError() as {
        status: string;
        statusText: string;
        data: string;
    };
    console.error(error);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.centerizator}>
                    <p className={styles.status_code}>{error.status}</p>
                    <h1 className={styles.not_found}>
                        {error.statusText || "Something went wrong"}
                    </h1>
                    <p className={styles.excuse}>{error.data}</p>
                    <div className={styles.actions}>
                        <Link to="/" className={styles["go-home"]}>
                            Go back home
                        </Link>
                        <Link to="support" className={styles["help-me"]}>
                            Contact support{" "}
                            <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
