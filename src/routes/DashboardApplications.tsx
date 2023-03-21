import Application from "../components/Application";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import applicationStyles from "../components/Application.module.css";

export default function DashboardApplications() {
    const applications = useSelector((state: RootState) => state.applications);

    return (
        <div>
            <h2>My submissions</h2>

            <header className={applicationStyles.container}>
                <h3
                    className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                >
                    Project Name
                </h3>
                <h3
                    className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                >
                    Submission message
                </h3>
                <h3
                    className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                >
                    Role
                </h3>
                <h3
                    className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                >
                    Submission date
                </h3>
                <h3
                    className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                >
                    Status
                </h3>
                <h3
                    className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                >
                    Controls
                </h3>
            </header>

            {applications.map((application) => (
                <Application key={application.id} {...application} />
            ))}
        </div>
    );
}
