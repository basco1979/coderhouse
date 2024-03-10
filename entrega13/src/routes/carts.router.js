import { Router } from './router.js'

import { deleteCart, deleteProductInCart, getCartById, saveCart, postProductInCart, putCart, putProductInCart, purchaseCart } from '../controllers/carts.controller.js'

export default class CartsRouter extends Router {
  init() {

this.post('/', ['USER'], saveCart)

this.get('/:cid',['USER'], getCartById)

this.post('/:cid/product/:pid',['USER'], postProductInCart)

this.delete('/:cid/product/:pid',['USER'], deleteProductInCart)

this.put('/:cid',['USER'], putCart)

this.put('/:cid/product/:pid',['USER'], putProductInCart)

this.put('/:cid/purchase', ['PUBLIC'],  purchaseCart)

this.delete('/:cid',['USER'], deleteCart)
  }}