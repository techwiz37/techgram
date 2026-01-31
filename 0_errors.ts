export abstract class TechgramError extends Error {
}

export class ConnectionError extends TechgramError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = "ConnectionError";
  }
}

export class AccessError extends TechgramError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = "AccessError";
  }
}

export class InputError extends TechgramError {
  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
    this.name = "InputError";
  }
}

export class TransportError extends TechgramError {
  constructor(public readonly code: number) {
    super(`Transport error: ${code}`);
    this.name = "TransportError";
  }
}

export class TLError extends TechgramError {
  override name = "TLError";
  #originalMessage: string;
  #path: string[];

  constructor(message: string, path: string[]) {
    super(`${message}${path.length ? ` at ${path.join(" ")}` : ""}`);
    this.#originalMessage = message;
    this.#path = path;
  }

  get originalMessage(): string {
    return this.#originalMessage;
  }

  get path(): string[] {
    return this.#path;
  }
}
