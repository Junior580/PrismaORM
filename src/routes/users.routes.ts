import { Request, Response, Router } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
export const usersRoutes = Router()

import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase'
import { GetUserUseCase } from '../useCases/GetUserUseCase'
import { UpdateUserUseCase } from '../useCases/UpdateUserUseCase'

usersRoutes.post('/users', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const user = new CreateUserUseCase(usersRepository)

    const createdUser = await user.execute({ name, email, password })

    return response.status(201).json(createdUser)
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json(error.message)
    }
    return response.status(500).json({ errorMessage: 'error', error })
  }
})

usersRoutes.get('/users', async (request: Request, response: Response) => {
  try {
    const usersRepository = new UsersRepository()

    const user = new GetUserUseCase(usersRepository)

    const createdUser = await user.execute()

    return response.status(201).json(createdUser)
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json(error.message)
    }
    return response.status(500).json({ errorMessage: 'error', error })
  }
})

usersRoutes.put('/users/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const userUpdate = new UpdateUserUseCase(usersRepository)

    const user = await userUpdate.execute({ id, name, email, password })

    return response.status(201).json(user)
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json(error.message)
    }
    return response.status(500).json({ errorMessage: 'error', error })
  }
})

usersRoutes.delete(
  '/users/:id',
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params

      const usersRepository = new UsersRepository()

      const userUpdate = new DeleteUserUseCase(usersRepository)

      const user = await userUpdate.execute({ id })

      return response.status(201).json({ message: 'user has deleted.', user })
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json(error.message)
      }
      return response.status(500).json({ errorMessage: 'error', error })
    }
  }
)
