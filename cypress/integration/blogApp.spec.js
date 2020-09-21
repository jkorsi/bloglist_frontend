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

  describe('When logged in', function ()
  {
    const blogName = 'A blog'
    const blogAuthor = 'Blog Author'
    const blogUrl = 'Blog Url'
    beforeEach(function ()
    {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login').click()
      cy.contains('Open Blog Form').click()
      cy.get('#title').type(blogName)
      cy.get('#author').type(blogAuthor)
      cy.get('#blogurl').type(blogUrl)
      cy.contains('Create Blog').click()
    })

    it('A blog can be created', function ()
    {
      cy.contains(blogName)
      cy.contains(blogAuthor)
    })

    it('A blog can be liked', function ()
    {
      cy.contains('View').click()
      cy.get('#like').click()
      cy.contains('1')
    })

    it('A blog can be deleted', function ()
    {
      cy.contains('View').click()
      cy.get('#delete').click()
      cy.get('#blogs').should('not.contain', blogName)
    })
  })

  describe('When logged in with blogs already in place', function ()
  {
    beforeEach(function ()
    {
      cy.login({
        username: 'test',
        password: 'test'
      })

      cy.createBlog({
        title: 'title 1',
        author: 'author 1',
        url: 'url 1',
        likes: 4
      })
      cy.createBlog({
        title: 'title 2',
        author: 'author 2',
        url: 'url 2',
        likes: 1
      })
      cy.createBlog({
        title: 'title 3',
        author: 'author 3',
        url: 'url 3',
        likes: 3
      })
      cy.createBlog({
        title: 'title 4',
        author: 'author 4',
        url: 'url 4',
        likes: 2
      })
    })


    it.only('Blogs are ordered descending', function ()
    {

      cy.get('#blog').then(blogs =>
      {
        cy.wrap(blogs).should("equal", blogs.sort(compareLikes))
      })
    })
  })
})

function compareLikes(a, b)
{
  //Sort descending
  return b.likes - a.likes
}