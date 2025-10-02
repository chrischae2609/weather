function formatTime(timeStr) {
    const [hour, minute, second] = timeStr.split(":");
    const date = new Date();
    date.setHours(hour, minute, second);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

export default formatTime;