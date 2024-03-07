export class InvalidUserError extends Error {
    constructor() {
        super('This user is not valid.')
    }
}