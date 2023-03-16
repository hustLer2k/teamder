import styles from "./Navbar.module.css";
import logo from "../../public/avatar.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = () => setIsOpen((prevIsOpen) => !prevIsOpen);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <nav className={styles["navbar"]}>
            {isMobile && (
                <div className={styles["hamburger-menu"]}>
                    <FiMenu
                        className="hamburger"
                        size={32}
                        onClick={clickHandler}
                    />

                    <img src={logo} alt="logo" className={styles["logo"]} />
                    <h2 className={styles["header"]}>Teamder</h2>
                </div>
            )}

            {(!isMobile || isOpen) && (
                <div className={styles.menu}>
                    <div className={styles["left-side"]}>
                        {!isMobile && (
                            <>
                                {" "}
                                <img
                                    src={logo}
                                    alt="logo"
                                    className={styles["logo"]}
                                />
                                <h2 className={styles["header"]}>Teamder</h2>{" "}
                            </>
                        )}
                        <Link to="#" className={styles["nav-link"]}>
                            Explore
                        </Link>
                        <Link to="#" className={styles["nav-link"]}>
                            Dashboard
                        </Link>
                    </div>
                    <div className={styles["right-side"]}>
                        <Link
                            to="#"
                            className={`${styles["nav-link"]} ${styles["sign-in"]}`}
                        >
                            Sign In
                        </Link>
                        <Link
                            to="#"
                            className={`${styles["nav-link"]} ${styles["sign-up"]}`}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
