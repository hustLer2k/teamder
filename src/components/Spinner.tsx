import classes from "./Spinner.module.css";
import Hamster from "./Hamster";

export default function Spinner({ big = false }: { big?: boolean }) {
    return big ? (
        <Hamster />
    ) : (
        <svg className={classes.svg} viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50" />
        </svg>
    );
}
