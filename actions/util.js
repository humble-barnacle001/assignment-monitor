export const halfmoonAlert = ({
    content = "Alert",
    title = "",
    alertType = "",
    fillType = "filled",
    hasDismissButton = true,
    timeShown = 5000,
}) => {
    if (window && window.halfmoon)
        window.halfmoon.initStickyAlert({
            content,
            title,
            alertType,
            fillType,
            hasDismissButton,
            timeShown,
        });
};
