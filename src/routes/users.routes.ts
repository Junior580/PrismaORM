import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { DeleteUserController } from '../controllers/DeleteUserController'
import { GetUserController } from '../controllers/GetUserController'
import { UpdateUserController } from '../controllers/UpdateUserController'

export const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserController = new GetUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

usersRoutes.post('/users', createUserController.handle)
usersRoutes.get('/users', getUserController.handle)
usersRoutes.put('/users/:id', updateUserController.handle)
usersRoutes.delete('/users/:id', deleteUserController.handle)
