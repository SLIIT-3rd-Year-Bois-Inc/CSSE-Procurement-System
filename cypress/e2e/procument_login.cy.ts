import 'cypress-wait-until';

/**
 * Check if the Procurement login renders
 */
it("properly renders", () => {
    cy.visit("procurement/login")
})

/**
 * Checks if the user login process works
 */
it("successfully log in user", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("dehemiweerakkodi2@gmail.com")
    cy.get('input[type=password]').type("qwertyuiop123#")
    cy.get('button[type=submit]').click()
    cy.waitUntil(function() {
        return cy.get('div').contains('Dehemi Weerakkody').should('be.visible')
    })
});

/**
 * Checks if the email is working even if the email is typed in capital letters
 */
 it("successfully log in user", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("DEHEMIweerakkodi2@gmail.com")
    cy.get('input[type=password]').type("qwertyuiop123#")
    cy.get('button[type=submit]').click()
    cy.waitUntil(function() {
        return cy.get('div').contains('Dehemi Weerakkody').should('be.visible')
    })
});

/**
 * Checks if the Email validation works
 */
it("validates email properly", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("dehemiweerakkodi2")
    cy.get('input[type=password]').type("qwertyuiop123#")
    cy.get('button[type=submit]').click()
    cy.get("div").contains(/must be a valid email/).should('exist')
})

/**
 * Checks if the Password validation works
 */
it("validates password properly", () => {
    cy.visit("procurement/login");
    cy.get('input[type=text]').type("dehemiweerakkodi2@gmail.com")
    cy.get('input[type=password]').type("qw")
    cy.get('button[type=submit]').click()
    cy.get("div").contains(/at least 6/).should('exist')
})
