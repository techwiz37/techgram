import { InputError } from "../0_errors.js";
export function validateCallbackQueryQuestion(q) {
    if (!["game", "password", "button"].includes(q.type)) {
        throw new InputError("Got invalid callback query question type.");
    }
    if (q.type === "password" && (typeof q.password !== "string" || !q.password)) {
        throw new InputError("Got empty password.");
    }
    if ((q.type === "button" || q.type === "password") && (typeof q.data !== "string" || !q.data)) {
        throw new InputError("Got empty button data.");
    }
}
