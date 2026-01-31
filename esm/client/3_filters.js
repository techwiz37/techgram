export function match(filter, value) {
    let [type, ...other] = filter.split(":");
    if (other.length === 0 && type !== "update" && "update" in value && value.update._ === type) {
        return true;
    }
    else if (type !== "" && !(type in value)) {
        return false;
    }
    if (type === "") {
        if (other.length !== 1) {
            return false;
        }
        if ("message" in value) {
            type = "message";
        }
        else if ("editedMessage" in value) {
            type = "editedMessage";
        }
        else if ("scheduledMessage" in value) {
            type = "scheduledMessage";
        }
        else {
            return false;
        }
    }
    const field = other[0];
    if (field) {
        if (!(field in value[type])) {
            return false;
        }
    }
    return true;
}
