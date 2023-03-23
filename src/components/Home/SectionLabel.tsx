import styles from "./SectionLabel.module.css";

export default function SectionLabel({
    title,
    index,
    gradientColors,
}: {
    title: string;
    index: number;
    gradientColors: string;
}) {
    return (
        <div
            className={`wrapper ${styles.wrapper}`}
            style={
                {
                    "--gradient-colors": gradientColors,
                } as React.CSSProperties
            }
        >
            <span className={styles.line}></span>
            <span className={styles.index}>{index}</span>
            <h3 className={styles.label}>
                <span>{title}</span>
            </h3>
        </div>
    );
}
