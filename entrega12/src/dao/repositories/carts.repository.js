import CartDTO from '../../dtos/cart.dto.js'

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

  deleteCart  = async (id) => {
   const cart = await this.dao.getCartById(id)
   cart.products = []
   await this.dao.updateCart(id, cart)
  }

}