import { Users } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO'

type IUsers = Users

export interface IUsersRepository {
  findOneByEmail(email: string): Promise<IUsers | null>
  create({ name, email, password }: ICreateUserDTO): Promise<IUsers>
  findAll(): Promise<IUsers[]>
  updateUser({ id, name, email, password }: IUpdateUserDTO): Promise<IUsers>
  findOneById(id: string): Promise<IUsers | null>
  deleteUser(id: string): Promise<void>
}
