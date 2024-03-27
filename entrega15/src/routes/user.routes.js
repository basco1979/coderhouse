import { Router } from 'express'
import { userToPremium } from '../controllers/session.controller.js'

const usersRouter = Router()

usersRouter.post('/premium/:uid', userToPremium)

export default usersRouter