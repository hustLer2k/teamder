import classes from "./Signin.module.css";
import Input, { InputRef } from "../components/Input";
import Spinner from "../components/Spinner";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useState, useRef } from "react";
import useToken from "../hooks/useToken";

interface RequestBody {
    email: string;
    password: string;
    username?: string;
}

interface ResponseBody {
    token?: string;
    message?: string;
}

const emailValidator = (value: string) => {
    if (!value) return [false, "Email must not be empty"] as const;
    if (value.length > 254)
        return [false, "Email length must no exceed 254 characters"] as const;

    return [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
        "Email is not valid",
    ] as const;
};

const PWValidator = (value: string) => {
    if (value.length < 10)
        return [false, "Password must contain at least 10 characters"] as const;
    if (value.length > 30)
        return [false, "Password length must no exceed 30 characters"] as const;

    return [
        !/^(|[^0-9]*|[^A-Z]*|[^a-z]*)$/.test(value),
        "Password must contain a number, an uppercase and lowercase character",
    ] as const;
};

const usernameValidator = (value: string) => {
    if (value.length < 4)
        return [false, "Username must contain at least 4 characters"] as const;
    if (value.length > 15)
        return [false, "Username length must no exceed 15 characters"] as const;

    return [/^[a-zA-Z0-9]+$/.test(value), "Username is not valid"] as const;
};

export default function SignUp() {
    const [searchParams] = useSearchParams();
    const [token, updateToken] = useToken();
    const navigate = useNavigate();

    const [isRegistering, setIsRegistering] = useState(
        !!searchParams.get("signup")
    );
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    const emailRef = useRef<InputRef>(null);
    const PWRef = useRef<InputRef>(null);
    const usernameRef = useRef<InputRef>(null);

    const toggleRegistering = () => setIsRegistering((prev) => !prev);

    const formSubmitHandler = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const usernameValidity = isRegistering
            ? usernameRef.current?.isValid
            : true;

        if (
            !(
                emailRef.current!.isValid &&
                PWRef.current!.isValid &&
                usernameValidity
            )
        ) {
            return;
        }

        setLoading(true);

        let body: RequestBody = {
            email: emailRef.current!.value,
            password: PWRef.current!.value,
        };
        if (isRegistering)
            body = { ...body, username: usernameRef.current!.value };

        try {
            const response = await fetch(
                "https://teamder-dev.herokuapp.com/api/auth/" +
                    (isRegistering ? "register" : "authenticate"),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                const FOKYOU = await response.json();
                console.error(FOKYOU);
                throw new Error("Invalid credentials.");
            }

            const data: ResponseBody = await response.json();

            if (!data.token) {
                throw new Error(data.message);
            }

            updateToken(data.token);
            navigate("/");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={classes.wrapper} onSubmit={formSubmitHandler}>
            <h2>{isRegistering ? "Create an account" : "Sign in"}</h2>
            {isRegistering && (
                <Input
                    label="Username"
                    predicate={usernameValidator}
                    ref={usernameRef}
                />
            )}
            <Input
                label="Email"
                predicate={emailValidator}
                ref={emailRef}
                inputOptions={{ type: "email" }}
            />
            <Input
                label="Password"
                predicate={PWValidator}
                ref={PWRef}
                inputOptions={{ type: "password" }}
            />

            {error && <p className={classes.error}>{error}</p>}

            {isLoading ? (
                <Spinner />
            ) : (
                <button className={classes.submit} type="submit">
                    {isRegistering ? "Create an account" : "Sign in"}
                </button>
            )}

            <p>
                {isRegistering ? "Already have an account?" : "New to Teamder?"}{" "}
                <button onClick={toggleRegistering} type="button">
                    {isRegistering ? "Sign in" : "Create an account"}
                </button>
            </p>
        </form>
    );
}
