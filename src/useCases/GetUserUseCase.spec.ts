import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUsersRepository'
import { GetUserUseCase } from './GetUserUseCase'

let userRepo: InMemoryUserRepository
let getUsers: GetUserUseCase

describe('get all users', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository()
    getUsers = new GetUserUseCase(userRepo)
  })

  it('should be able to get all users', async () => {
    await userRepo.create({
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })

    const user = await getUsers.execute()

    expect(user[0].name).toBe('user1')
  })

  it('should not able to get non existing user', async () => {
    await expect(getUsers.execute()).rejects.toBeInstanceOf(Error)
  })
})
