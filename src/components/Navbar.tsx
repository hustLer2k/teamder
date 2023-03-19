import styles from "./Navbar.module.css";
import logo from "../assets/avatar.svg";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FiMenu } from "react-icons/fi";
import useToken from "../hooks/useToken";

import { useDispatch } from "react-redux";
import { setId } from "../store/store";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [avatarURL, setAvatarURL] = useState<string>(logo);
    const [userId, setUserId] = useState<string>("");
    const [token] = useToken();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) return;

        fetch("https://teamder-dev.herokuapp.com/api/users/profile/81", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((profileData) => {
                setAvatarURL(profileData.avatarUrl);
                setUserId(profileData.id);

                dispatch(setId(profileData.id));
            })
            .catch((err) => console.error(err));

        return () => URL.revokeObjectURL(avatarURL);
    }, [token]);

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
                        <NavLink
                            to="/projects"
                            className={({ isActive }) =>
                                `${styles["nav-link"]} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            Explore
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `${styles["nav-link"]}  ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </div>
                    <div className={styles["right-side"]}>
                        {!token && (
                            <>
                                <NavLink
                                    to="/signin"
                                    className={({ isActive }) =>
                                        `${styles["nav-link"]}  ${
                                            isActive ? styles.active : ""
                                        }`
                                    }
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to={{
                                        pathname: "/signin",
                                        search: "?signup=true",
                                    }}
                                    className={({ isActive }) =>
                                        `${styles["nav-link"]} ${
                                            styles["sign-up"]
                                        } ${isActive ? styles.active : ""}`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}

                        {token && (
                            <NavLink to={`/users/${userId}`}>
                                <img
                                    className={styles.avatar}
                                    src={avatarURL}
                                    alt="Avatar"
                                />
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
