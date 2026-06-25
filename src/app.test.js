const request = require('supertest')
const app = require('./index')

describe('User API', () => {
  
  // Real failure: calling endpoint that depends on MongoDB (not connected in test)
  test('GET /api/users returns user list', async () => {
    const response = await request(app).get('/api/users')
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(Array.isArray(response.body.data)).toBe(true)
  })

  // Real failure: wrong expected status code
  test('POST /api/users creates a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }
    const response = await request(app)
      .post('/api/users')
      .send(userData)
    
    // Bug: expects 201 but app returns 200
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })

  // Real failure: testing undefined function
  test('verifyToken returns decoded payload', () => {
    const { generateToken, verifyToken } = require('./auth')
    const token = generateToken('user123')
    const decoded = verifyToken(token)
    // decoded is undefined because verifyToken has no return statement
    expect(decoded.id).toBe('user123')
  })

})
