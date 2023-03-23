import styles from "./MainHeader.module.css";

export default function MainHeader() {
    return (
        <h1 aria-label="Join. Collaborate. Succeed" className={styles.title}>
            <span className={styles.first_word}>Join.</span>
            <span className={styles.second_word}>Collaborate.</span>
            <span className={styles.third_word}>Succeed.</span>
        </h1>
    );
}
