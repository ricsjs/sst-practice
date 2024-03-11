export class UnableToRegisterError extends Error {
    constructor() {
        super("Unable to register this record.")
    }
}