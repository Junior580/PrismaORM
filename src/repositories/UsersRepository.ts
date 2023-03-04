import { PrismaClient, Users } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { IUsersRepository } from './interfaces/IUsersRepository'
import { v4 as uuid } from 'uuid'

const prisma = new PrismaClient()

type IUsers = Users

export class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient
  constructor() {
    this.prisma = prisma
  }

  public async findOneByEmail(email: string): Promise<IUsers | null> {
    const user = await this.prisma.users.findFirst({
      where: { email },
    })

    return user || null
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUsers> {
    const user = await this.prisma.users.create({
      data: {
        id: uuid().toUpperCase(),
        name,
        email,
        password,
      },
    })

    return user
  }

  public async findAll(): Promise<Users[]> {
    const users = await this.prisma.users.findMany()

    return users
  }

  public async updateUser({
    id,
    name,
    email,
    password,
  }: IUpdateUserDTO): Promise<Users> {
    const users = await this.prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    })

    return users
  }

  public async findOneById(id: string): Promise<Users | null> {
    const user = this.prisma.users.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  public async deleteUser(id: string) {
    const user = await this.prisma.users.delete({
      where: {
        id,
      },
    })
  }
}
