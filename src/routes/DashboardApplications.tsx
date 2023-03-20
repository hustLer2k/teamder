import styles from "./DashboardApplications.module.css";
import Application from "../components/Application";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function DashboardApplications() {
    const applications = useSelector((state: RootState) => state.applications);

    return (
        <section className={styles.container}>
            {applications.map((application) => (
                <Application key={application.id} {...application} />
            ))}
        </section>
    );
}
