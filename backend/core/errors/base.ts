export class BaseError extends Error {
  code: string;
  payload?: unknown;

  constructor(code: string, message: string, payload?: unknown) {
    super(message);
    this.code = code;
    this.payload = payload;
  }
}
