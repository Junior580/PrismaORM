import { Users } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO'
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

  public async updateUser({
    id,
    name,
    email,
    password,
  }: IUpdateUserDTO): Promise<Users> {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      throw null
    }

    return user
  }

  public async findOneById(id: string): Promise<Users | null> {
    const user = this.users.find(user => user.id === id)

    return user || null
  }

  public async deleteUser(id: string): Promise<void> {
    this.users.pop()
  }
}
