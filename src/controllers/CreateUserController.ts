import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { CreateUserUseCase } from '../useCases/CreateUserUseCase'

export class CreateUserController {
  public async handle(request: Request, response: Response) {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const user = new CreateUserUseCase(usersRepository)

    const createdUser = await user.execute({ name, email, password })

    return response.status(201).json(createdUser)
  }
}
