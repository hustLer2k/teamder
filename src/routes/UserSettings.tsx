import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import styles from "./UserSettings.module.css";
import AvatarEditor from "../components/AvatarEditor";
import defaultAvatar from "../assets/avatar.svg";
import { FaChevronLeft, FaChevronRight, FaRandom } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, identicon, thumbs } from "@dicebear/collection";
import Input from "../components/Input";
import { InputRef } from "../components/Input";

interface UserData {
    id: string;
    username: string;
    avatarUrl: string;
}

const AVATARS = [null, botttsNeutral, identicon, thumbs] as const;
const STYLES_LENGTH = AVATARS.length;

const encoder = new TextEncoder();

function usernameValidator(username: string): [boolean, string] {
    if (username.length < 3) {
        return [false, "Username must be at least 3 characters long"];
    } else if (username.length > 15) {
        return [false, "Username must be at most 15 characters long"];
    } else {
        return [true, ""];
    }
}

function contactLinkValidator(contactLink: string): [boolean, string] {
    const urlPattern =
        /^https?:\/\/(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[\w.-]*)*(?:\?[\w-]+=[\w.%+-]+(?:&[\w-]+=[\w.%+-]+)*)?(?:#[\w-]+)?$/i;

    return [urlPattern.test(contactLink), "Invalid URL"];
}

function emailValidator(email: string): [boolean, string] {
    const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return [emailPattern.test(email), "Invalid email"];
}

function passwordValidator(password: string): [boolean, string] {
    if (password.length < 10) {
        return [false, "Password must be at least 10 characters long"];
    } else if (password.length > 100) {
        return [false, "Password must be at most 100 characters long"];
    } else {
        return [true, ""];
    }
}

export default function UserSettings() {
    const [token] = useToken();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [avatarFile, setAvatarFile] = useState<Blob | null | File>(null);
    const [seed, setSeed] = useState(Math.random().toString());

    const imgRef = useRef<HTMLImageElement>(null);
    const usernameRef = useRef<InputRef>(null);
    const contactLinkRef = useRef<InputRef>(null);
    const emailRef = useRef<InputRef>(null);
    const passwordRef = useRef<InputRef>(null);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const setup = !!searchParams.get("setup");

    useEffect(() => {
        if (setup || !token) return;

        setLoading(true);
        fetch("https://teamder-dev.herokuapp.com/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        })
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
        if (!user) return;

        if (avatarIndex === 0) {
            imgRef!.current!.src = user!.avatarUrl;
            setAvatarFile(null);
        } else {
            let ava = createAvatar(AVATARS[avatarIndex], {
                seed,
                size: 288,
                radius: 50,
            });

            ava.toDataUri().then((data) => {
                imgRef!.current!.src = data;
            });

            setAvatarFile(new Blob([encoder.encode(ava.toString())]));
        }
    }, [avatarIndex, seed, user]);

    const errorHandler = (errorMessage: string) => setError(errorMessage);
    const avatarChangeHandler = (avatar: File) => setAvatarFile(avatar);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        for (let inputRef of [
            usernameRef,
            contactLinkRef,
            emailRef,
            passwordRef,
        ]) {
            console.log(inputRef?.current?.value, inputRef?.current?.isValid);
            if (inputRef?.current?.value && !inputRef?.current?.isValid) {
                setError(
                    "Please either fill out the fields correctly or leave them empty"
                );
                return;
            }
        }

        const formData = new FormData(e.currentTarget);
        if (avatarFile) formData.append("profilePicture", avatarFile);

        console.log(Object.fromEntries(formData));

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

    const randomizeSeed = () => setSeed(Math.random().toString());

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

                <button className={styles.controls} onClick={randomizeSeed}>
                    <FaRandom size={32} />
                </button>

                <form className={styles.form} onSubmit={submitHandler}>
                    <Input
                        label="Username"
                        predicate={usernameValidator}
                        inputOptions={{ required: false, name: "username" }}
                        ref={usernameRef}
                    />
                    <Input
                        label="Contact link"
                        inputOptions={{
                            type: "url",
                            required: false,
                            name: "contact",
                        }}
                        predicate={contactLinkValidator}
                        ref={contactLinkRef}
                    />
                    <Input
                        label="Email"
                        inputOptions={{
                            type: "email",
                            required: false,
                            name: "email",
                        }}
                        predicate={emailValidator}
                        ref={emailRef}
                    />
                    <Input
                        label="Password"
                        inputOptions={{
                            type: "password",
                            required: false,
                            name: "password",
                        }}
                        predicate={passwordValidator}
                        ref={passwordRef}
                    />

                    {<p className={styles.error}>{error}</p>}

                    <button className={styles.submit} type="submit">
                        Save
                    </button>
                </form>
            </div>
        );
    }

    return content;
}
