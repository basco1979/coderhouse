import { Router } from 'express'
import { isUser} from '../middlewares/auth.js'
import { deleteCart, deleteProductInCart, getCartById, saveCart, postProductInCart, putCart, putProductInCart, purchaseCart } from '../controllers/carts.controller.js'

const cartsRouter = Router()

cartsRouter.post('/', isUser , saveCart)

cartsRouter.get('/:cid', isUser , getCartById)

cartsRouter.post('/:cid/product/:pid', isUser , postProductInCart)

cartsRouter.delete('/:cid/product/:pid', isUser , deleteProductInCart)

cartsRouter.put('/:cid', isUser , putCart)

cartsRouter.put('/:cid/product/:pid', isUser , putProductInCart)

cartsRouter.put('/:cid/purchase', isUser, purchaseCart)

cartsRouter.delete('/:cid', isUser , deleteCart)

export default cartsRouter