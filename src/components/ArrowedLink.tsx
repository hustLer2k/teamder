import styles from "./ArrowedLink.module.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function ArrowedLink({
    to,
    text,
    size = 24,
    className,
}: {
    to: string;
    text: string;
    size?: number;
    className?: string;
}) {
    return (
        <Link to={to} className={`${styles["arrowed-link"]} ${className}`}>
            {text} <AiOutlineArrowRight size={size} />
        </Link>
    );
}
