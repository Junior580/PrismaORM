import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { GetUserUseCase } from '../useCases/GetUserUseCase'

export class GetUserController {
  public async handle(request: Request, response: Response) {
    const usersRepository = new UsersRepository()

    const user = new GetUserUseCase(usersRepository)

    return response.status(201).json(user)
  }
}
