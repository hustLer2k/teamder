import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import styles from "./UserSettings.module.css";
import AvatarEditor from "../components/AvatarEditor";
import defaultAvatar from "../assets/avatar.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, identicon, thumbs } from "@dicebear/collection";

interface UserData {
    id: string;
    username: string;
    avatarUrl: string;
}

const AVATARS = [botttsNeutral, identicon, thumbs];
const STYLES_LENGTH = AVATARS.length;

const encoder = new TextEncoder();

export default function UserSettings() {
    const [token] = useToken();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [avatarFile, setAvatarFile] = useState<Blob | null | File>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const setup = !!searchParams.get("setup");

    useEffect(() => {
        if (setup || !token) return;

        setLoading(true);
        fetch("https://teamder-dev.herokuapp.com/api/users/profile")
            .then((res) => {
                if (
                    res.ok &&
                    res.headers.get("Content-Type") === "application/json"
                ) {
                    return res.json();
                } else {
                    throw new Error(res.statusText || "Something went wrong");
                }
            })
            .then((data) => {
                const userData = data as UserData;
                if (!userData.avatarUrl) userData.avatarUrl = defaultAvatar;

                setUser(userData);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [setup, token]);

    useEffect(() => {
        let ava = createAvatar(AVATARS[avatarIndex], {
            seed: Math.random().toString(),
            size: 288,
            radius: 50,
        });

        ava.toDataUri().then((data) => {
            console.log(data);
            imgRef!.current!.src = data;
        });

        setAvatarFile(new Blob([encoder.encode(ava.toString())]));
    }, [avatarIndex]);

    const errorHandler = (errorMessage: string) => setError(errorMessage);
    const avatarChangeHandler = (avatar: File) => setAvatarFile(avatar);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (avatarFile) formData.append("profilePicture", avatarFile);

        setLoading(true);
        setError("");
        fetch(
            `https://teamder-dev.herokuapp.com/api/users/profile/${user!.id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setError(data.message);
                } else {
                    navigate(`/users/${user?.id}`);
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    let content: JSX.Element | null = null;

    if (loading) {
        content = <Spinner big />;
    } else {
        content = (
            <div className={styles.container}>
                <div className={styles.avatar_previewer}>
                    <button
                        className={styles.controls}
                        onClick={() =>
                            setAvatarIndex((prevState) =>
                                --prevState % STYLES_LENGTH < 0
                                    ? STYLES_LENGTH - 1
                                    : prevState % STYLES_LENGTH
                            )
                        }
                    >
                        <FaChevronLeft size={32} />
                    </button>
                    <AvatarEditor
                        avatarUrl={user?.avatarUrl}
                        onError={errorHandler}
                        onAvatarChange={avatarChangeHandler}
                        ref={imgRef}
                    />
                    <button
                        className={styles.controls}
                        onClick={() =>
                            setAvatarIndex(
                                (prevState) => ++prevState % STYLES_LENGTH
                            )
                        }
                    >
                        <FaChevronRight size={32} />
                    </button>
                </div>
                <form className={styles.form} onSubmit={submitHandler}></form>
            </div>
        );
    }

    return content;
}
