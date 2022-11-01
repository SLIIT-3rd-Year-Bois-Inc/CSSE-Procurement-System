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
  COUNTERS = "counters"
}

enum Counters {
  ORDER_COUNTER = "order-counter"
}

export { OrderStates, DBCollections, Counters };
