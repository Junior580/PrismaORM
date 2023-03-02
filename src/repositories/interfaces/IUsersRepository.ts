import { Users } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

type IUsers = Users

export interface IUsersRepository {
  findOneByEmail(email: string): Promise<IUsers | null>
  create({ name, email, password }: ICreateUserDTO): Promise<IUsers>
  findAll(): Promise<IUsers[]>
}
