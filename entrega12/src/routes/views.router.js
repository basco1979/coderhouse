import { Router } from './router.js'
import { checkAuth, checkExistingUser } from "../middlewares/auth.js";
import { addProductToCart, getCartDetailPage, getChatPage, getFailLoginPage, getFailRegisterPage, getIndexPage, getLoginPage, getProductsPage, getRegisterPage, restorePassword } from '../controllers/views.controller.js';


export default class ViewsRouter extends Router{
  init() {
this.get('/', ['PUBLIC'],checkAuth, getIndexPage);

this.get('/login', ['PUBLIC'], checkExistingUser, getLoginPage);

this.get('/register', ['PUBLIC'], checkExistingUser, getRegisterPage)

this.get('/chat', ['USER'], getChatPage)

this.get('/products',  ['USER'],getProductsPage)

this.get('/:cid/add/:pid', ['USER'],addProductToCart)

this.get('/cart/:cid', ['USER'],getCartDetailPage)

this.get('/restore-password',  ['USER'], checkExistingUser,  restorePassword)

this.get('/failregister', ['PUBLIC'],getFailRegisterPage)

this.get('/faillogin',['PUBLIC'],getFailLoginPage)
}
}

