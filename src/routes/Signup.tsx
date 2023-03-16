import classes from "./Signup.module.css";
import Input, { InputRef } from "../components/Input";

import { useState, useEffect, useRef } from "react";

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
    if (value.length < 8)
        return [false, "Password must contain at least 8 characters"] as const;
    if (value.length > 30)
        return [false, "Passowrd length must no exceed 30 characters"] as const;

    return [
        !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/.test(value),
        "Password must contain a number, an uppercase and lowercase character",
    ] as const;
};

export default function SignUp() {
    const [isRegistering, setIsRegistering] = useState(true);
	const [error, setError] = useState("");
	const [isLoading, setLoading] = useState(false);

	const emailRef = useRef<InputRef>(null);
	const PWRef = useRef<InputRef>(null);

    return (
        <div className={classes.wrapper}>
            <Input label="Email" predicate={() => [true, "fdsfds"]} />
        </div>
    );
}
