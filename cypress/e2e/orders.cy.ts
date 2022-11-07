
import 'cypress-wait-until';

it("renders the orders page", () => {
    cy.visit("/procurement/order");
  });

it("loads orders", () => {
    cy.visit("/procurement/order");
    cy.wait(10000);
    cy.get("div").contains("Querying the Orders").should("not.exist")
}) 

it("changes the order states and re-renders", () => {
    cy.visit("/procurement/order");
    cy.wait(10000);
    cy.get("div").contains("Querying the Orders").should("not.exist")
    cy.get('select').select(2)
    cy.wait(10000);
    cy.get("div").contains("Querying the Orders").should("not.exist")
})

