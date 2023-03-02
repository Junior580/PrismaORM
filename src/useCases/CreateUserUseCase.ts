import { Users } from '@prisma/client'
import { v4 as uuid } from 'uuid'
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
      throw new Error('User already exists.')
    }

    const createdUser = await this.usersRepository.create({
      id: uuid().toUpperCase(),
      name,
      email,
      password,
    })

    return createdUser
  }
}
