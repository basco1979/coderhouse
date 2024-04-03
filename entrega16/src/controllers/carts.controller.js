import { productModel } from '../dao/models/product.model.js'
import { userModel } from '../dao/models/user.model.js'
import { cartsService } from '../dao/repositories/index.js'

//Save a new cart to the database
export const saveCart = async (req, res) => {
  const cart = req.body
  try {
    const result = await cartsService.saveCart(cart)
    res.send(result)
  } catch (err) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to add cart`)
  }
}

//Get a specific cart by its id
export const getCartById = async (req, res) => {
  const cid = req.params.cid
  const cart = await cartsService.getCartById(cid)
  if (cart) {
    if (cart.products.length < 1) {
      req.logger.info(`${new Date().toLocaleTimeString()} - Empty Cart`)
      res.send({ message: 'Empty Cart' })
    } else {
      res.send({ cart })
    }
  } else res.status(404).send({ error: 'Cart not found' })
}

//Adds a product to the cart by passing product id and cart id
export const postProductInCart = async (req, res) => {
const { pid, cid } = req.params;
  try {
   const prod = await productModel.findOne({ _id: pid })
    const user = await userModel.findOne({ cartId: cid })
    if (prod.owner !== user.email) {
    const result = await cartsService.addProductToCart(cid, pid)
    res.redirect("/products");
    } else {
     return res.status(403).json({message:"You can't put your own products in the shopping cart"})
    }
  } catch (err) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to add product`)
  }
}

//Delets a product in the cart by passing product id and cart id
export const deleteProductInCart = async (req, res) => {
  const { cid, pid } = req.params
   try {
    const result = await cartsService.deleteProductInCart(cid, pid)
    res.send(result)
  } catch (err) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to delete product`)
  }
}

export const putCart = async (req, res) => {
  //no entiendo bien que hace esto
  const { cid } = req.params
  const newCart = req.body
  try {
    const cartUpdated = await cartsService.updateCart(cid, newCart)
    req.logger.info(`${new Date().toLocaleTimeString()} - Cart Updated`)
    res.status(201).json(cartUpdated)
  } catch (error) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to update product`)
  }
}

//Update product in the cart by passing product id and cart id
export const putProductInCart = async (req, res) => {
  const { cid, pid } = req.params
  const quantity = req.body.quantity
  try {
    const cartUpdated = await cartsService.putProductInCart(cid, pid, quantity)
    req.logger.info(`${new Date().toLocaleTimeString()} - Cart Updated`)
    res.status(201).json(cartUpdated)
  } catch (error) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to update product`)
  }
}

//Empty cart
export const deleteCart = async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartsService.deleteCart(cid)
    res.json(cart)
  } catch (error) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to empty cart`)
  }
}

//Finish purchase process
export const purchaseCart = async (req, res) => {
  let { cid } = req.params
  try {
    const cart = await cartsService.purchaseCart(cid)
    res.status(cart)
  } catch (error){
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to make the purchase`)
  }
}