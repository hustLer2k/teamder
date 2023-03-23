import styles from "./Description.module.css";
import { Link } from "react-router-dom";
import SectionLabel from "./SectionLabel";
import code_collaboration from "../../assets/code_collaboration.svg";

export default function Description() {
    return (
        <>
            <h2 className={`${styles.description} wrapper`}>
                Teamder is a dynamic and intuitive platform that empowers
                individuals to discover and create exciting new projects, while
                connecting with like-minded collaborators to bring their ideas
                to life. With its user-friendly interface and innovative search
                tools, Teamder offers an unparalleled opportunity to build your
                dream team and seize new professional opportunities.
            </h2>

            <div className={styles.buttons}>
                <Link to="/projects/create" className={styles.create_button}>
                    Create a Project
                </Link>

                <Link to="/projects" className={styles.view_button}>
                    <span>View Projects</span>
                </Link>
            </div>

            <SectionLabel
                title="Join"
                index={1}
                gradientColors="var(--first-gr-colors)"
            />
            <h4 className={styles.section_title}>
                Join forces to achieve more
            </h4>
            <h2 className={`${styles.description} wrapper`}>
                Joining a community of like-minded individuals can be a powerful
                way to achieve your goals. By working together and sharing your
                expertise, you can accomplish things that you might not be able
                to on your own. Joining forces can lead to new opportunities and
                can help you achieve success more quickly.
            </h2>

            <SectionLabel
                title="Collaborate"
                index={2}
                gradientColors="var(--second-gr-colors)"
            />
            <h4 className={styles.section_title}>Collaborate to innovate</h4>
            <h2 className={`${styles.description} wrapper`}>
                Collaboration is key to innovation. By bringing together people
                with different perspectives, skillsets, and backgrounds, you can
                generate new ideas and approaches that you might not have
                thought of on your own. Collaborating can lead to breakthroughs
                and can help you create innovative solutions to complex
                problems.
            </h2>

            <SectionLabel
                title="Succeed"
                index={3}
                gradientColors="var(--third-gr-colors)"
            />
            <h4 className={styles.section_title}>
                Succeed through partnership
            </h4>
            <h2 className={`${styles.description} wrapper`}>
                Success is often the result of strong partnerships. By
                partnering with others who share your goals and values, you can
                pool your resources and expertise to achieve great things.
                Partnerships can help you grow your business, expand your reach,
                and achieve your objectives more efficiently and effectively.
            </h2>
        </>
    );
}
