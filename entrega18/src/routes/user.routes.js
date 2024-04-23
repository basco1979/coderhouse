import { Router } from 'express'
import { userToPremium, postDocument } from '../controllers/users.controller.js'
import { uploader } from '../utils/multer.js'

const usersRouter = Router()

usersRouter.post('/premium/:uid', userToPremium)
usersRouter.post('/:uid/documents',uploader.single('profile'), postDocument)

export default usersRouter