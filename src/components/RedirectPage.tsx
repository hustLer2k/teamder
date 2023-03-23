import styles from "./RedirectPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RedirectPage({
    redirectUrl = "/signin",
    message = "Redirect to login page",
}: {
    redirectUrl?: string;
    message?: string;
}) {
    const navigate = useNavigate();

    useEffect(() => navigate(redirectUrl), [navigate, redirectUrl]);

    return (
        <div className={`${styles.wrapper} wrapper`}>
            <h1 className={styles.title}>{message}</h1>
            <Link to={redirectUrl} className={styles.link}></Link>
        </div>
    );
}
