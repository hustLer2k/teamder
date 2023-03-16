import classes from "./Spinner.module.css";

export default function Spinner() {
    return (
        <svg className={classes.svg} viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50" />
        </svg>
    );
}
