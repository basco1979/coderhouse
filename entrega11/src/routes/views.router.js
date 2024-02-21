import { Router } from 'express'
import { productModel } from '../dao/models/product.model.js'
import CartManagerDB from '../dao/cartManagerDB.js'
import { checkAuth, checkExistingUser } from "../middlewares/auth.js";
import { addProductToCart, getCartDetailPage, getChatPage, getFailLoginPage, getFailRegisterPage, getIndexPage, getLoginPage, getProductsPage, getRegisterPage, restorePassword } from '../controllers/views.controller.js';


const cartManager = new CartManagerDB()
const viewsRouter = Router()

viewsRouter.get('/', checkAuth, getIndexPage);

viewsRouter.get('/login', checkExistingUser, getLoginPage);

viewsRouter.get('/register', checkExistingUser, getRegisterPage)

viewsRouter.get('/chat', getChatPage)

viewsRouter.get('/products', getProductsPage)

viewsRouter.get('/:cid/add/:pid', addProductToCart)

viewsRouter.get('/cart/:cid', getCartDetailPage)

viewsRouter.get('/restore-password', checkExistingUser,  restorePassword)

viewsRouter.get('/failregister', getFailRegisterPage)

viewsRouter.get('/faillogin',getFailLoginPage)

export default viewsRouter
