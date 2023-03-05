import { describe, expect, beforeEach, it } from 'vitest'
import { AppError } from '../../src/errors/AppError'
import { InMemoryUserRepository } from '../../src/repositories/inMemory/InMemoryUsersRepository'
import { DeleteUserUseCase } from '../../src/useCases/DeleteUserUseCase'

let userRepo: InMemoryUserRepository
let deleteUser: DeleteUserUseCase

describe('delete user user', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository()
    deleteUser = new DeleteUserUseCase(userRepo)
  })

  it('should be able to delete an user', async () => {
    const user1 = await userRepo.create({
      name: 'user2',
      email: 'user2@email.com',
      password: 'teste123',
    })

    const user = await deleteUser.execute(user1.id)

    expect(user).toBe(undefined)
  })

  it('should not able to delete non existing user', async () => {
    await expect(deleteUser.execute('nonExstingID')).rejects.toBeInstanceOf(
      AppError
    )
  })
})
