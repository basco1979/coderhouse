import { Router } from 'express'
import { userToPremium, postDocument } from '../controllers/users.controller.js'
import { uploadProfile, uploadAccountStatement, uploadAddres, uploadProduct } from '../utils/multer.js'

const usersRouter = Router()

usersRouter.post('/premium/:uid', userToPremium)
usersRouter.post('/:uid/documents/profile',uploadProfile, postDocument)
usersRouter.post('/:uid/documents/product',uploadProduct, postDocument)
usersRouter.post('/:uid/documents/accountstatement',uploadAccountStatement, postDocument)
usersRouter.post('/:uid/documents/address',uploadAddres, postDocument)

export default usersRouter