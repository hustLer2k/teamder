import styles from "./Home.module.css";

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.hero_texts}>
                <h1 aria-label="Join. Collaborate. Succeed">
                    <span className={styles.first_word}>Join.</span>
                    <span className={styles.second_word}>Collaborate.</span>
                    <span className={styles.third_word}>Succeed.</span>
                </h1>
            </div>
        </div>
    );
}
