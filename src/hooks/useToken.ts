import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { update } from "../store/store";

const TOKEN_DURATION = 1e9;

export default function useToken() {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.token);

    useEffect(() => {
        if (
            !token &&
            "token" in window.localStorage &&
            typeof localStorage.token === "string"
        ) {
            dispatch(update(localStorage.token));

            try {
                const expirationDate = new Date(localStorage.expirationDate);

                const lambda = expirationDate.getTime() - Date.now();
                if (lambda < 60) throw new Error("Token expired.");

                setTimeout(() => dispatch(update(null)), lambda);
            } catch (err) {
                dispatch(update(null));
            }
        }
    }, []);

    function updateToken(newToken: string) {
        const curDate = new Date();
        const expirationDate = new Date(curDate.getTime() + TOKEN_DURATION);

        localStorage.token = newToken;
        localStorage.expirationDate = expirationDate.toString();

        dispatch(update(newToken));
        setTimeout(() => dispatch(update(null)), TOKEN_DURATION);
    }

    return [token, updateToken] as const;
}
