import { Users } from '@prisma/client'
import { AppError } from '../errors/AppError'
import { IUsersRepository } from '../repositories/interfaces/IUsersRepository'

interface ICreateUserRequest {
  name: string
  email: string
  password: string
}

type ICreateUserResponse = Users

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserRequest): Promise<ICreateUserResponse> {
    const user = await this.usersRepository.findOneByEmail(email)

    if (user) {
      throw new AppError('User already exists.')
    }

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return createdUser
  }
}
