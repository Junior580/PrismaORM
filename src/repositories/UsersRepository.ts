import { PrismaClient, Users } from '@prisma/client'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from './interfaces/IUsersRepository'

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
    id,
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUsers> {
    const user = await this.prisma.users.create({
      data: {
        id,
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
}