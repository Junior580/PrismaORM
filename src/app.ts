import express from 'express'
import 'express-async-errors'
import { handleError } from './middlewares/handlerError'
import { usersRoutes } from './routes/users.routes'

export const app = express()

app.use(express.json())

app.use(usersRoutes)

app.use(handleError)
