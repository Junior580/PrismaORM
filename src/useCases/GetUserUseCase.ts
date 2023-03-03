import { Users } from '@prisma/client'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

type IGetUserResponse = Users[]

export class GetUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(): Promise<IGetUserResponse> {
    const users = await this.usersRepository.findAll()

    if (users.length === 0) {
      throw new Error('Nothing user.')
    }

    return users
  }
}
