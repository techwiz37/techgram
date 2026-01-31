import { techgramError } from "../0_errors.js";
export class SessionError extends techgramError {
    constructor(message) {
        super(message);
    }
}
