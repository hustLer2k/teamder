import styles from "./UserEditForm.module.css";

export default function UserEditForm({
    bio,
    onSubmit,
    onCancel,
}: {
    bio?: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}) {
    return (
        <form className={styles.form} onSubmit={onSubmit} onReset={onCancel}>
            <label htmlFor="bio">Bio</label>
            <textarea
                id="bio"
                name="bio"
                maxLength={1000}
                rows={4}
                placeholder="Tell us about yourself"
                defaultValue={bio}
            />

            <button type="submit" className={styles.primary_button}>
                Save
            </button>
            <button type="reset">Cancel</button>
        </form>
    );
}
