import { describe, expect, beforeEach, it } from 'vitest'
import { AppError } from '../../src/errors/AppError'
import { InMemoryUserRepository } from '../../src/repositories/inMemory/InMemoryUsersRepository'
import { CreateUserUseCase } from '../../src/useCases/CreateUserUseCase'

let userRepo: InMemoryUserRepository
let createUser: CreateUserUseCase

describe('create user', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository()
    createUser = new CreateUserUseCase(userRepo)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'user2',
      email: 'user2@email.com',
      password: 'teste123',
    })
    expect(user.name).toBe('user2')
  })

  it('should not able to create user with the same email', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })

    await expect(
      createUser.execute({
        name: 'user1',
        email: 'user1@email.com',
        password: 'teste123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
