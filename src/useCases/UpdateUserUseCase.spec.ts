import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUsersRepository'
import { UpdateUserUseCase } from './UpdateUserUseCase'

let userRepo: InMemoryUserRepository
let updateUser: UpdateUserUseCase

describe('update users data', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository()
    updateUser = new UpdateUserUseCase(userRepo)
  })

  it('should be able to update an existing user', async () => {
    const user1 = await userRepo.create({
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })

    const user = await updateUser.execute({
      id: user1.id,
      name: 'user2',
      email: 'user2@email.com',
    })

    expect(user.name).toBe('user2')
    expect(user.email).toBe('user2@email.com')
  })

  it('should not able to updating non existing user', async () => {
    await userRepo.create({
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })

    await expect(
      updateUser.execute({
        id: 'nonExistingID',
        name: 'user1',
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
