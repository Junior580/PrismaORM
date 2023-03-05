import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { GetUserUseCase } from '../useCases/GetUserUseCase'

export class GetUserController {
  public async handle(request: Request, response: Response) {
    const usersRepository = new UsersRepository()

    const getUsers = new GetUserUseCase(usersRepository)

    const users = await getUsers.execute()

    return response.status(200).json(users)
  }
}
