import styles from "./ProjectApplication.module.css";
import DropFile from "./DropInput";
import useToken from "../hooks/useToken";
import { useState, useEffect } from "react";
import Application from "./Application";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/store";
import type { RootState } from "../store/store";

export default function ProjectApplication({
    openedRolesNames,
    projectId,
}: {
    openedRolesNames: string[];
    projectId: string;
}) {
    const dispatch = useDispatch();
    const applications = useSelector((state: RootState) => state.applications);

    const [CV, setCV] = useState<File | null>(null);
    const [status, setStatus] = useState<JSX.Element | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [token] = useToken();

    useEffect(() => {
        let application = applications.find(
            (app) => app.projectId === +projectId
        );
        if (application) {
            setStatus(
                <>
                    <h3>Your application</h3>
                    <Application {...application} />
                </>
            );
        }
    }, [applications, projectId]);

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (!CV) {
            setError("Please upload a CV");
            return;
        }
        if (CV.size > 2 * 1024 * 1024) {
            setError("CV size must be less than 2MB");
            return;
        }
        const trimmedMessage = formData
            .get("applicationMessage")
            ?.toString()
            .trim();
        if (!trimmedMessage) {
            setError("Please write a message");
            return;
        }
        if (trimmedMessage.length > 300) {
            setError("Message must be less than 300 characters");
            return;
        }

        formData.append("cv", CV);

        setStatus(<Spinner />);
        let response: Response;
        fetch(
            `https://teamder-dev.herokuapp.com/api/projects/${projectId}/applications`,
            {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                response = res;
                return res.json();
            })
            .then((responseJSON) => {
                if (
                    response.ok &&
                    response.headers.get("Content-Type") === "application/json"
                ) {
                    let application = {
                        message: responseJSON.message,
                        role: responseJSON.roleRequest,
                        CVUrl: responseJSON.resumeURL,
                        date: responseJSON.applicationDate,
                    };

                    console.log(responseJSON);
                    dispatch(add({ ...application, id: +projectId }));

                    setStatus(
                        <>
                            <h3>Your application</h3>
                            <Application {...application} />
                        </>
                    );
                } else {
                    setError(responseJSON.message);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return status ? (
        status
    ) : (
        <>
            <form className={styles.form} onSubmit={submitHandler}>
                <label htmlFor="message">Application message:</label>
                <textarea
                    id="message"
                    name="applicationMessage"
                    required
                    maxLength={300}
                    rows={3}
                />

                <label htmlFor="role">Select a role:</label>
                <select id="role" name="roleRequest" required>
                    {openedRolesNames.map((role, i) => (
                        <option value={role} key={i}>
                            {role}
                        </option>
                    ))}
                </select>

                <label htmlFor="cv">Upload your CV:</label>
                <DropFile onFileChange={(file) => setCV(file)} />

                <button type="submit">Submit</button>
            </form>
            {error && <Error message={error} />}
        </>
    );
}

function Error({ message }: { message: string }) {
    return <p className={styles.error}>{message}</p>;
}
