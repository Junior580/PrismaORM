import { Users } from '@prisma/client'
import { AppError } from '../errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

interface IUpdateUserRequest {
  id: string
  name?: string
  email?: string
  password?: string
}

type IUpdateUserResponse = Users

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    id,
    name,
    email,
    password,
  }: IUpdateUserRequest): Promise<IUpdateUserResponse> {
    const user = await this.usersRepository.findOneById(id)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    if (email) {
      const emailExisting = await this.usersRepository.findOneByEmail(email)
      if (emailExisting) {
        throw new AppError('Email already exists.')
      }
    }

    const usersUpdate = await this.usersRepository.updateUser({
      id,
      name,
      email,
      password,
    })

    return usersUpdate
  }
}
