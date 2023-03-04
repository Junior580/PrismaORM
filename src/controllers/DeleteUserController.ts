import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase'

export class DeleteUserController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params

    const usersRepository = new UsersRepository()

    const userUpdate = new DeleteUserUseCase(usersRepository)

    const user = await userUpdate.execute(id)

    return response.status(204).json({ message: 'user has deleted.', user })
  }
}
