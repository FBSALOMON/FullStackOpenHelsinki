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

      cy.get('.notification')
        .contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'fsalomon', password: 'secret' })
    })

    it('A blog can be created', function() {
      cy.get('#newBlog-button').click()

      cy.get('#title').type('TitleTest')
      cy.get('#author').type('AuthorTest')
      cy.get('#url').type('www.test.com')

      cy.get('#createBlog-button').click()

      cy.get('#blogList').contains('TitleTest')
      cy.get('#blogList').contains('AuthorTest')
      cy.get('#blogList').contains('www.test.com')
    })

    describe('After the blog is created', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'TitleTest', author: 'AuthorTest', url: 'www.test.com' })
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.blogLikes').should('contain', 1)
      })

      it('A blog can be deleted by creator', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('#blogList').should('not.contain', 'TitleTest')
        cy.get('.notification').should('contain', 'Blog TitleTest by AuthorTest has been removed').and('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('A blog can only be deleted by creator', function() {
        const anotherUser = {
          name: 'Another User',
          username: 'auser',
          password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', anotherUser)
        cy.login({ username: 'auser', password: 'secret' })

        cy.contains('view').click()
        cy.get('#blogList').should('not.contain', 'remove')
      })
    })
  })
})