import { cartsService } from '../dao/repositories/index.js'

export const saveCart = async (req, res) => {
  const cart = req.body
  try {
    const result = await cartsService.saveCart(cart)
    res.send(result)
  } catch (err) {
    console.log('Error to add cart')
  }
}

export const getCartById = async (req, res) => {
  const cid = req.params.cid
  const cart = await cartsService.getCartById(cid)
  if (cart) {
    if (cart.products.length < 1) {
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
    console.log('Error to add product')
  }
}


export const deleteProductInCart = async (req, res) => {
  const { cid, pid } = req.params
   try {
    const result = await cartsService.deleteProductInCart(cid, pid)
    res.send(result)
  } catch (err) {
    console.log('Error to delete product')
  }
}

export const putCart = async (req, res) => {
  //no entiendo bien que hace esto
  const { cid } = req.params
  const newCart = req.body
  try {
    await cartsService.updateCart(cid, newCart)
    res.json({ message: 'Carrito actualizado' })
  } catch (error) {
    console.log('Error al actualizar el producto')
  }
}

export const putProductInCart = async (req, res) => {
  const { cid, pid } = req.params
  const quantity = req.body.quantity
  try {
    await cartsService.putProductInCart(cid, pid, quantity)
    res.json({message: "Cart Updated"})
  } catch (error) {
    console.log('Error al actualizar el producto')
  }
}

export const deleteCart = async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartsService.deleteCart(cid)
    res.json(cart)
  } catch (error) {
    console.log('Error to empty cart')
  }
}

export const purchaseCart = async (req, res) => {
  let { cid } = req.params
  try {
    const cart = await cartsService.purchaseCart(cid)
    res.status(cart)
  } catch (error){
    console.log('Error to make the purchase')
  }
}