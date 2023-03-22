import Application from "../components/Application";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import applicationStyles from "../components/Application.module.css";
import Pagination from "../components/Pagination";

export default function DashboardApplications() {
    const applications = useSelector((state: RootState) => state.applications);

    return (
        <>
            <h2 className="dashboard_header">My submissions</h2>
            <div className="dashboard_wrapper">
                <header className={applicationStyles.container}>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Project Name
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Message
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Role
                    </h3>
                    <h3
                        className={`${applicationStyles.item} ${applicationStyles.header_item}`}
                    >
                        Date
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
        </>
    );
}
