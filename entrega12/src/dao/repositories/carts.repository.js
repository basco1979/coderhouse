import CartDTO from '../../dtos/cart.dto.js'
import TicketDTO from '../../dtos/ticket.dto.js'
import { productModel } from '../models/product.model.js'
import { ticketModel } from '../models/ticket.model.js';
import { userModel } from '../models/user.model.js'
import { uuid } from 'uuidv4';

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
    console.log(cart)
    //si no tiene el producto lo agrega al carrito
    if (!cart.products.some((p) => p.product.toString() === product)) {
      cart.products.push({ product: product, quantity: 1 })
    } else {
      // si ya existe el producto aumenta la cantidad del mismo
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
    console.log(cart)
    let index = cart.products.find((item) => item.id === productId)
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
        console.log('Product exceeds stock')
        newCart = cart.products[i]
      }
      if (cart.products[i].quantity <= product.stock) {
        product.stock -= cart.products[i].quantity
        await productModel.findOneAndUpdate({ _id: product.id }, product)
        let amount = (cart.products[i].quantity*product.price)
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
  }

}
