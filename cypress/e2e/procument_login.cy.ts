import 'cypress-wait-until';

it("properly renders", () => {
    cy.visit("procurement/login")
})

it("successfully log in user", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("dehemiweerakkodi2@gmail.com")
    cy.get('input[type=password]').type("qwertyuiop123#")
    cy.get('button[type=submit]').click()
    cy.waitUntil(function() {
        return cy.get('div').contains('Dehemi Weerakkody').should('be.visible')
    })
});

it("validates email properly", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("dehemiweerakkodi2")
    cy.get('input[type=password]').type("qwertyuiop123#")
    cy.get('button[type=submit]').click()
    cy.get("div").contains(/must be a valid email/).should('exist')
})

it("validates password properly", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("dehemiweerakkodi2@gmail.com")
    cy.get('input[type=password]').type("qw")
    cy.get('button[type=submit]').click()
    cy.get("div").contains(/at least 6/).should('exist')
})
