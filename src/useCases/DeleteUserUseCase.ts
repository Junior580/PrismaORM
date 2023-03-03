import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

interface IDeleteUserRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ id }: IDeleteUserRequest): Promise<void> {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new Error('User does not exists.')
    }

    await this.usersRepository.deleteUser(id)
  }
}
