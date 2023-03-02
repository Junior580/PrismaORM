import { Users } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../interfaces/IUsersRepository'

export class InMemoryUserRepository implements IUsersRepository {
  private users: Users[] = []

  public async findOneByEmail(email: string): Promise<Users | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Users> {
    const user = {} as Users
    Object.assign(user, { name, email, password })

    this.users.push(user)

    return user
  }

  public async findAll(): Promise<Users[]> {
    return this.users
  }
}
