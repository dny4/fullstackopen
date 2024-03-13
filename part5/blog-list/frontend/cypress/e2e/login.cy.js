describe('front end can be opened', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/test/cleanup`)

    const user = {
      name: 'testuser',
      username: 'testuser',
      password: 'testuser'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page is visible', function() {
    cy.contains('blog list app')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('valid user can log in', function() {
    cy.contains('Login').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testuser')
    cy.get('#login-button').click()

    cy.contains('testuser is logged')
  })
})
