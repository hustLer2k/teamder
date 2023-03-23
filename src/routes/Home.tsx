import styles from "./Home.module.css";
import MainHeader from "../components/Home/MainHeader";
import Description from "../components/Home/Description";

export default function Home() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.hero_texts}>
                <MainHeader />
                <Description />
            </div>
        </div>
    );
}
