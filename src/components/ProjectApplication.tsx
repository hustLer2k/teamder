import styles from "./ProjectApplication.module.css";
import DropFile from "./DropInput";
import useToken from "../hooks/useToken";
import { useState, useEffect } from "react";
import SingleApplication from "./SingleApplication";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/store";
import type { RootState } from "../store/store";

export default function ProjectApplication({
    openedRolesNames,
    projectId,
    projectName,
}: {
    openedRolesNames: string[];
    projectId: string;
    projectName: string;
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
                    <SingleApplication {...application} />
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
                let application = {
                    message: responseJSON.message,
                    role: responseJSON.roleRequest,
                    CVUrl: responseJSON.resumeURL,
                    date: responseJSON.applicationDate,
                    status: responseJSON.status,
                    id: responseJSON.id,
                    projectId: +projectId,
                    projectName,
                };

                dispatch(add({ ...application, id: +projectId }));

                setStatus(
                    <>
                        <h3>Your application</h3>
                        <SingleApplication {...application} />
                    </>
                );
            })
            .catch((err) => {
                setStatus(null);
                setError(err.message || "Something went wrong");
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
            {error && <ErrorXD message={error} />}
        </>
    );
}

function ErrorXD({ message }: { message: string }) {
    return <p className={styles.error}>{message}</p>;
}
