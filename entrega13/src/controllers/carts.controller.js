import { cartsService } from '../dao/repositories/index.js'

export const saveCart = async (req, res) => {
  const cart = req.body
  try {
    const result = await cartsService.saveCart(cart)
    res.send(result)
  } catch (err) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to add cart`)
  }
}

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

export const postProductInCart = async (req, res) => {
  const { cid } = req.params
  const { pid } = req.params
  try {
    const result = await cartsService.addProductToCart(cid, pid)

    res.send(result)
  } catch (err) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to add product`)
  }
}


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

export const deleteCart = async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartsService.deleteCart(cid)
    res.json(cart)
  } catch (error) {
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to empty cart`)
  }
}

export const purchaseCart = async (req, res) => {
  let { cid } = req.params
  try {
    const cart = await cartsService.purchaseCart(cid)
    res.status(cart)
  } catch (error){
    req.logger.error(`${new Date().toLocaleTimeString()} - Error to make the purchase`)
  }
}