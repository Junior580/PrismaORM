import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryUserRepository } from '../repositories/inMemory/InMemoryUsersRepository'
import { UpdateUserUseCase } from './UpdateUserUseCase'

let userRepo: InMemoryUserRepository
let updateUser: UpdateUserUseCase

describe('get all users', () => {
  beforeEach(() => {
    userRepo = new InMemoryUserRepository()
    updateUser = new UpdateUserUseCase(userRepo)
  })

  it('should be able to update an user', async () => {
    const teste = await userRepo.create({
      id: '123',
      name: 'user1',
      email: 'user1@email.com',
      password: 'teste123',
    })
    const usersss = await userRepo.findOneById('123')
    console.log(usersss)

    const user = await updateUser.execute({ id: '123', name: 'user2' })

    expect(user.name).toBe('user2')
  })

  // it('should not able to get non existing user', async () => {
  //   // await expect(.execute()).rejects.toBeInstanceOf(Error)
  // })
})
