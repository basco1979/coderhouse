import { Router } from 'express'

import { deleteCart, deleteProductInCart, getCartById, saveCart, postProductInCart, putCart, putProductInCart } from '../controllers/carts.controller.js'

export default class CartsRouter extends Router {
  init() {

this.post('/', ['USER'], saveCart)

this.get('/:cid',['USER'], getCartById)

this.post('/:cid/product/:pid',['USER'], postProductInCart)

this.delete('/:cid/product/:pid',['USER'], deleteProductInCart)

this.put('/:cid',['USER'], putCart)

this.put('/:cid/product/:pid',['USER'], putProductInCart)

this.delete('/:cid',['USER'], deleteCart)
  }}