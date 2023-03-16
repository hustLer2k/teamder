import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styles from "./Input.module.css";

interface Props {
    label: string;
    predicate: (value: string) => readonly [boolean, string];
    labelVisible?: boolean;
    inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

const Input = forwardRef(function Input(
    { label, predicate, labelVisible = false, inputOptions = {} }: Props,
    inputRef
) {
    inputOptions = {
        id: label.trim().replace(/\s+/, "-"),
        type: "text",
        required: true,
        ...inputOptions,
    };
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        inputOptions?.onChange?.(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) =>
        setTouched(true);

    useEffect(() => {
        let val = value.trim();

        const [validity, error] = predicate(val);
        const invalidity = !validity && touched;

        if (invalidity) {
            setError(error);
        } else {
            setError("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, touched]); // don't force importers to wrap validator functions in useCallback

    useImperativeHandle(
        inputRef,
        () => {
            let valueTrimmed = value.trim();
            let validity = predicate(valueTrimmed)[0];

            return {
                value: valueTrimmed,
                isValid: validity,
                isInvalid: !validity && touched,
                touch: () => setTouched(true),
                reset: () => {
                    setValue("");
                    setError("");
                    setTouched(false);
                },
            };
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [value, error, touched] // don't force importers to wrap validator functions in useCallback
    );

    return (
        <div className={styles["input-block"]}>
            <input
                {...inputOptions}
                onChange={changeHandler}
                onBlur={blurHandler}
            />
            <label htmlFor={inputOptions.id}>{label}</label>
        </div>
    );
});

export default Input;

interface InputRef {
    value: string;
    isValid: boolean;
    isInvalid: boolean;

    touch: () => void;
    reset: () => void;
}
export type { InputRef };
