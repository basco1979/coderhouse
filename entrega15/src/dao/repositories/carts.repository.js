import CartDTO from '../../dtos/cart.dto.js'
import CustomErrors from '../../services/errors/CustomError.js'
import {
  productExceedsStock,
  generateSingleIdError,
} from '../../services/errors/info.js'
import { productModel } from '../models/product.model.js'
import { ticketModel } from '../models/ticket.model.js'
import { userModel } from '../models/user.model.js'
import { uuid } from 'uuidv4'

export default class CartRepository {
  constructor(dao) {
    this.dao = dao
  }

  getCarts = () => {
    const result = this.dao.getCarts()
    return result
  }

  getCartById = (id) => {
    const cart = this.dao.getCartById(id)
    return cart
  }

  createCart = (cart) => {
    const newCart = new CartDTO(cart)
    const result = this.dao.saveCart(newCart)
    return result
  }

  addProductToCart = async (id, product) => {
    const cart = await this.dao.getCartById(id)
    //If don't have the product, add it to the cart.
    if (!cart.products.some((p) => p.product.toString() === product)) {
      cart.products.push({ product: product, quantity: 1 })
    } else {
      // If the product already exists, increase its quantity
      for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].product.toString() === product) {
          cart.products[i].quantity += 1
        }
      }
    }
    await this.dao.updateCart(id, cart)
  }

  deleteProductInCart = async (id, productId) => {
    const cart = await this.dao.getCartById(id)
    let index = cart.products.find((item) => item.id === productId)
    if (!index) {
      CustomErrors.createError({
        name: 'error to delete product',
        cause: generateSingleIdError(id),
        message: 'product does not exists in cart',
        code: ErrorEnum.ID_NOT_FOUND,
      })
    }
    if (index) {
      cart.products.pull(index)
    }
    await this.dao.updateCart(id, cart)
  }

  updateCart = async (id, cart) => {
    const cartUpdated = await this.dao.updateCart(id, cart)
    return cartUpdated
  }

  putProductInCart = async (idCart, idProduct, quantity) => {
    const cart = await this.dao.getCartById(idCart)
    let index
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].id === idProduct) {
        index = i
      } else {
        CustomErrors.createError({
          name: 'product error',
          cause: generateSingleIdError(id),
          message: 'product does not exists in cart',
          code: ErrorEnum.ID_NOT_FOUND,
        })
      }
    }
    cart.products[index].quantity = quantity
    await this.dao.updateCart(idCart, cart)
  }

  deleteCart = async (id) => {
    const cart = await this.dao.getCartById(id)
    cart.products = []
    await this.dao.updateCart(id, cart)
  }

  purchaseCart = async (id) => {
    const cart = await this.dao.getCartById(id)
    let newCart = []
    let ticket = {}
    for (let i = 0; i < cart.products.length; i++) {
      const product = await productModel.findOne({
        _id: cart.products[i].product,
      })
      if (cart.products[i].quantity > product.stock) {
        CustomErrors.createError({
          name: 'quantity error',
          cause: productExceedsStock(),
          message: 'product exceeds stock',
          code: ErrorEnum.EXCEEDS_STOCK,
        })
        newCart = cart.products[i]
      }
      if (cart.products[i].quantity <= product.stock) {
        product.stock -= cart.products[i].quantity
        await productModel.findOneAndUpdate({ _id: product.id }, product)
        let amount = cart.products[i].quantity * product.price
        ticket.amount = 0
        ticket.amount += amount
        ticket.code = uuid()
        ticket.purchase_datetime = new Date().toISOString()
        const user = await userModel.findOne({ cartId: id })
        ticket.purchaser = user.email
      }
    }
    await this.dao.updateCart(id, { products: newCart })
    const ticketGenerated = await ticketModel.create(ticket)
    return ticketGenerated
  }
}
