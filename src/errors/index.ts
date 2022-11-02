export class OrderDoesNotExist extends Error {
    constructor() {
        super("Order does not exist.");
    }
}