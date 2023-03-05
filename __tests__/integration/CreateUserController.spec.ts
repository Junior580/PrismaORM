import { describe, it, expect } from 'vitest'
import * as request from 'supertest'
import { app } from '../../src/app'

describe('teste', () => {
  it('should be able to create new user', async () => {
    const response = await request(app).post('/users/').send({
      name: 'user1',
      email: 'user2@email.com',
      password: 'teste123',
    })

    expect(response.status).toBe(201)
  })
})
