import { TechgramError } from "../0_errors.ts";

export class SessionError extends TechgramError {
  constructor(message: string) {
    super(message);
  }
}
