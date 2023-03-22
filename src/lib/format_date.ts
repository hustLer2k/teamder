export default function formatDate(date: string, long = false) {
    const UTCDate = new Date(
        Date.UTC(
            parseInt(date.slice(0, 4)), // Year
            parseInt(date.slice(5, 7)) - 1, // Month (0-based)
            parseInt(date.slice(8, 10)), // Day
            parseInt(date.slice(11, 13)), // Hour
            parseInt(date.slice(14, 16)), // Minute
            parseInt(date.slice(17, 19)) // Second
        )
    );

    const formattedDate = new Intl.DateTimeFormat(undefined, {
        hour12: false,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: long ? "2-digit" : undefined,
        minute: long ? "2-digit" : undefined,
    }).format(new Date(UTCDate));

    return formattedDate;
}
