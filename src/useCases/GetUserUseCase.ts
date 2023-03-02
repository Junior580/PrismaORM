import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

export class GetUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute() {
    const users = await this.usersRepository.findAll()

    if (users.length === 0) {
      throw new Error('Nothing user.')
    }

    return users
  }
}
