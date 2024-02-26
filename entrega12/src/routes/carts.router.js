import { Router } from 'express'

import { deleteCart, deleteProductInCart, getCartById, postCart, postProductInCart, putCart, putProductInCart } from '../controllers/carts.controller.js'

const cartRouter = Router()

cartRouter.post('/', postCart)

cartRouter.get('/:cid', getCartById)

cartRouter.post('/:cid/product/:pid', postProductInCart)

cartRouter.delete('/:cid/product/:pid', deleteProductInCart)

cartRouter.put('/:cid', putCart)

cartRouter.put('/:cid/product/:pid', putProductInCart)

cartRouter.delete('/:cid', deleteCart)

export default cartRouter