enum OrderStates {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  ACCEPTED = "accepted",
  RETUREND = "returned",
  REJECTED = "rejected",
  COMPLETED = "completed",
  DRAFT = "draft"
}

enum DBCollections {
  USERS = "users",
  ORDERS = "orders",
  PRODUCTS = "products",
  SITES = "sites",
  BANK_ACCOUNTS = "bank_accounts",
  COUNTERS = "counters",
  DELIVERIES = "deliveries"
}

enum Counters {
  ORDER_COUNTER = "order-counter"
}

export enum DeliveryStates {
  ACCEPTED = "accepted",
  RETURNED = "returned",
  COMPLETED = "completed",
  NOT_INITIATED = "not_initiated"
}

export { OrderStates, DBCollections, Counters };
