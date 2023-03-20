import styles from "./AvatarSlideshow.module.css";

export default function AvatarSlideshow({ avatars }: { avatars: string[] }) {
    return (
        <div className={styles.container}>
            <div
                className={styles.slideshow_frame}
                style={{ width: `${(avatars.length - 1) * 48}px` }}
            >
                {avatars.map((avatar, index) => (
                    <img
                        src={avatar}
                        alt="Avatars slideshow"
                        key={index}
                        className={styles.avatar}
                    />
                ))}
            </div>
        </div>
    );
}
