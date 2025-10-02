
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

export default formatDate;