import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Pagination.module.css";
import { Link } from "react-router-dom";

export default function Pagination({
    baseLink,
    totalPages,
    currentPage,
}: {
    baseLink: string;
    totalPages: number;
    currentPage: number;
}) {
    const pages: JSX.Element[] = [];

    if (totalPages <= 5) {
        for (let pageNum = 0; pageNum < totalPages; pageNum++)
            pages.push(
                <Page key={pageNum} pageNum={pageNum} baseLink={baseLink} />
            );
    } else {
        for (let pageNum = 0; pageNum < 3; pageNum++)
            pages.push(
                <Page key={pageNum} pageNum={pageNum} baseLink={baseLink} />
            );

        pages[2] = <Ellipsis key={2} />;
        pages[3] = (
            <Page
                key={totalPages - 1}
                pageNum={totalPages}
                baseLink={baseLink}
            />
        );
    }

    return (
        <nav className={styles.pagination} aria-label="Pagination">
            <Link
                to={`${baseLink}?page=${Math.max(0, currentPage - 1)}`}
                className={`${styles.chevron} ${styles.left}`}
            >
                <FiChevronLeft size={24} aria-hidden="true" />
            </Link>
            {pages}
            <Link
                to={`${baseLink}?page=${Math.min(
                    currentPage + 1,
                    totalPages - 1
                )}`}
                className={`${styles.chevron} ${styles.right}`}
            >
                <FiChevronRight size={24} aria-hidden="true" />
            </Link>
        </nav>
    );
}

function Page({ baseLink, pageNum }: { baseLink: string; pageNum: number }) {
    return (
        <Link
            to={`${baseLink}?page=${pageNum}`}
            aria-current="page"
            className={styles.page}
        >
            {pageNum + 1}
        </Link>
    );
}

function Ellipsis() {
    return <span className={styles.page}>...</span>;
}
