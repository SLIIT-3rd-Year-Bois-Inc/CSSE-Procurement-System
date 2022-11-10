/**
 * Defines the errors in a common place
 */

export class OrderDoesNotExist extends Error {
  constructor() {
    super("Order does not exist.");
  }
}
