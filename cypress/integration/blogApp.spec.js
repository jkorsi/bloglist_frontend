describe('Blog app', function ()
{
  beforeEach(function ()
  {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function ()
  {
    cy.contains('Blogs Log In')
  })

  describe('Login', function ()
  {
    it('succeeds with correct credentials', function ()
    {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login').click()

      cy.contains('Logged in as: Test')
    })

    it('fails with wrong credentials', function ()
    {
      cy.get('#username').type('test')
      cy.get('#password').type('test2')
      cy.get('#login').click()

      cy.contains('Blogs Log In')
    })
  })

  describe.only('When logged in', function ()
  {
    beforeEach(function ()
    {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login').click()
    })

    it('A blog can be created', function ()
    {
      cy.contains('Open Blog Form').click()
      cy.get('#title').type('Blog Abc')
      cy.get('#author').type('Blog Author')
      cy.get('#blogurl').type('www.abcblog.com')
      cy.contains('Create Blog').click()
      cy.contains('Blog Abc')
      cy.contains('Blog Author')
    })

    it('A blog can be liked', function ()
    {
      cy.contains('Open Blog Form').click()
      cy.get('#title').type('Like a blog')
      cy.get('#author').type('Blog liker')
      cy.get('#blogurl').type('www.likeblogs.com')
      cy.contains('Create Blog').click()
      cy.contains('View').click()
      cy.get('#like').click()
      cy.contains('1')
    })
  })



  
})

