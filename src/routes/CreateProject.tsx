import styles from "./CreateProject.module.css";
import Roles from "../components/Roles";
import useToken from "../hooks/useToken";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function CreateProject() {
    const [token] = useToken();
    const [roles, setRoles] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const roleInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const shortDescriptionInput = useRef<HTMLTextAreaElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const chatLinkInput = useRef<HTMLInputElement>(null);
    const ownerRoleInput = useRef<HTMLInputElement>(null);
    const refs = [
        nameInput,
        shortDescriptionInput,
        descriptionInput,
        chatLinkInput,
        ownerRoleInput,
    ];

    function addRole() {
        if (roleInput.current) {
            const role = roleInput.current.value.trim();
            if (role.length > 0) {
                setRoles([...roles, role]);
                roleInput.current.value = "";
            }
        }
    }

    function deleteRole(roleIndex: number) {
        setRoles((roles) => roles.filter((_, index) => index !== roleIndex));
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        for (const ref of refs) {
            if (ref.current!.value.trim().length < 2) {
                setError("All fields must be filled");
                return;
            }
        }

        if (!roles.length) {
            setError("You must add at least one role");
            return;
        }

        const project = {
            chatInviteLink: chatLinkInput.current!.value,
            description: descriptionInput.current!.value,
            name: nameInput.current!.value,
            ownerRole: { name: ownerRoleInput.current!.value },
            roles: [...roles.map((role) => ({ name: role }))],
            shortDescription: shortDescriptionInput.current!.value,
        };

        setLoading(true);
        fetch("https://teamder-dev.herokuapp.com/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(project),
        })
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
            .then((data) => {
                navigate(`/projects/${data.id}`);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    return (
        <div className={styles.container}>
            <h1>Create a new project</h1>
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles["form-group"]}>
                    <label htmlFor="name">Project name</label>
                    <input
                        type="text"
                        id="name"
                        maxLength={15}
                        required
                        ref={nameInput}
                    />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="shortDescription">Short description</label>
                    <textarea
                        id="shortDescription"
                        rows={5}
                        maxLength={300}
                        required
                        ref={shortDescriptionInput}
                    />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows={5}
                        maxLength={1000}
                        required
                        ref={descriptionInput}
                    />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="chatLink">Chat link</label>
                    <input
                        type="url"
                        id="chatLink"
                        required
                        ref={chatLinkInput}
                    />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="ownerRole">Your role</label>
                    <input
                        type="text"
                        id="ownerRole"
                        required
                        ref={ownerRoleInput}
                    />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="role">Add roles</label>
                    <div className={styles.roles_controls}>
                        <input type="text" id="role" ref={roleInput} />
                        <button type="button" onClick={addRole}>
                            Add
                        </button>
                        <Roles
                            roles={roles}
                            centerize
                            onRoleDelete={deleteRole}
                        />
                    </div>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                {loading ? (
                    <Spinner />
                ) : (
                    <button type="submit" className={styles.submit_button}>
                        Create
                    </button>
                )}
            </form>
        </div>
    );
}
