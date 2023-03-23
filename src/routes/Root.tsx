import { useEffect } from "react";
import useToken from "../hooks/useToken";
import { Outlet, useNavigation } from "react-router-dom";
import styles from "./Root.module.css";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { add } from "../store/store";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

interface ApplicationsResponse {
    id: number;
    applicantMessage: string;
    applicationDate: string;
    resumeURL: string;
    role: string;
    projectName: string;
    projectId: number;
    status: "WAITING_FOR_REVIEW" | "REJECTED" | "ACCEPTED";
}

function App() {
    const [token] = useToken();
    console.log(token);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) return;
        fetch(
            "https://teamder-dev.herokuapp.com/api/users/dashboard/applications?size=2281337",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                if (
                    res.ok &&
                    res.headers.get("Content-Type") === "application/json"
                ) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then((responseJSON) => {
                responseJSON.content.forEach(
                    (application: ApplicationsResponse) =>
                        dispatch(
                            add({
                                id: application.id,
                                message: application.applicantMessage,
                                role: application.role,
                                CVUrl: application.resumeURL,
                                date: application.applicationDate,
                                projectName: application.projectName,
                                projectId: application.projectId,
                                status: application.status,
                            })
                        )
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token, dispatch]);

    return (
        <div className={styles["root-container"]}>
            <Navbar />
            <main className={styles.main}>
                {navigation.state === "loading" ? (
                    <Spinner big={true} />
                ) : (
                    <Outlet />
                )}
            </main>

            <footer>
                <div className={styles["footer-row"]}>
                    <img
                        src={logo}
                        alt="Company logo"
                        className={styles["logo"]}
                    />
                    {/* <h3 className={styles["company-name"]}>Teamder</h3> */}
                    <span>
                        Copyright © 2023 Teamder Inc. All rights reserved.
                    </span>
                </div>
                <div className={styles["footer-row"]}>
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact us</Link>
                </div>
            </footer>
        </div>
    );
}

export default App;
