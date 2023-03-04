import { AppError } from '../errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    await this.usersRepository.deleteUser(id)
  }
}
