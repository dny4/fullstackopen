describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'root',
      username: 'root',
      password: 'sekret'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front end page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.contains('login').click()
    cy.contains('root logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.request('POST', `${BACKEND_URL}/api/login`, {
      //   username: 'root',
      //   password: 'sekret'
      // })
      //   .then(response => {
      //     localStorage.setItem('loggedNoteAppUser',
      //       JSON.stringify(response.body))
      //   })
      // cy.visit(URL)

      // cy.contains('Login').click()
      // cy.get('#username').type('root')
      // cy.get('#password').type('sekret')
      // cy.contains('login').click()
      // cy.contains('root logged in')
      //

      cy.login({
        username: 'root',
        password: 'sekret'
      })

    })

    it('a new note can be created', function() {
      cy.contains('New note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and if a note exists', function() {
      beforeEach(function() {
        // cy.contains('New note').click()
        // cy.get('input').type('another note cypress')
        // cy.contains('save').click()

        cy.createNote({
          content: 'another note cypress',
          important: true
        })
      })

      it('it can be made not important', function() {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })
    })


    describe('and when several notes exist', function() {
      beforeEach(function() {
        cy.login({ username: 'root', password: 'sekret' })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        cy.contains('second note')
          .contains('make important')
          .click()

        cy.contains('second note')
          .contains('make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
    cy.get('.error').contains('Wrong credentials')
  })

  // using should
  it('login fails with wrong credentials', function() {
    cy.contains('Login').click()
    cy.get('#username').click()
    cy.get('#password').click()
    cy.get('#login-button').click()

    // cy.get('.error').should('contain', 'Wrong credentials')
    // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    // cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'root logged in')

    // cy.contains('root logged in').should('not.exist')


  })
})

