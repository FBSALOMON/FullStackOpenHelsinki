describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Fernando Salomon',
      username: 'fsalomon',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('fsalomon')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Fernando Salomon logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

    it('unsuccessful login is displayed red', function() {
      cy.get('#username').type('wrongUser')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})