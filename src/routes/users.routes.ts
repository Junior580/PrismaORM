import { Request, Response, Router } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
export const usersRoutes = Router()

import { CreateUserUseCase } from '../useCases/CreateUserUseCase'
import { GetUserUseCase } from '../useCases/GetUserUseCase'

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
    const user = new GetUserUseCase()
    const createdUser = await user.execute()

    return response.status(201).json(createdUser)
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json(error.message)
    }
    return response.status(500).json({ errorMessage: 'error', error })
  }
})
