// Defines all the states a order can have
enum OrderStates {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  ACCEPTED = "accepted",
  RETUREND = "returned",
  REJECTED = "rejected",
  COMPLETED = "completed",
  DRAFT = "draft",
  PAID = "paid",
}

// Defines all the collection names in the database
enum DBCollections {
  USERS = "users",
  ORDERS = "orders",
  PRODUCTS = "products",
  SITES = "sites",
  BANK_ACCOUNTS = "bank_accounts",
  COUNTERS = "counters",
  DELIVERIES = "deliveries",
  SUPPLIERS = "suppliers",
}

// Defines all the counter collections used in the database
enum Counters {
  ORDER_COUNTER = "order-counter",
}

// Defines all the states a delivery can have
export enum DeliveryStates {
  ACCEPTED = "accepted",
  RETURNED = "returned",
  COMPLETED = "completed",
  NOT_INITIATED = "not_initiated",
}

export { OrderStates, DBCollections, Counters };
