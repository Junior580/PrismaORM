import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { UpdateUserUseCase } from '../useCases/UpdateUserUseCase'

export class UpdateUserController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()

    const userUpdate = new UpdateUserUseCase(usersRepository)

    const user = await userUpdate.execute({ id, name, email, password })

    return response.status(201).json(user)
  }
}
