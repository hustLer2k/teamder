import styles from "./ProjectApplication.module.css";
import DropFile from "./DropInput";

export default function ProjectApplication({
    openedRolesNames,
}: {
    openedRolesNames: string[];
}) {
    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor="message">Application message:</label>
            <textarea id="message" name="message" required />

            <label htmlFor="role">Select a role:</label>
            <select id="role" name="role" required>
                {openedRolesNames.map((role, i) => (
                    <option value={role} key={i}>
                        {role}
                    </option>
                ))}
            </select>

            <label htmlFor="cv">Upload your CV:</label>
            <DropFile onFileChange={(file) => console.log(file)} />

            <button type="submit">Submit</button>
        </form>
    );
}
