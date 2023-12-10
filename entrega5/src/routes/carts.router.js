import { Router } from 'express'
import CartManager from '../cartManager.js'

const cartManager = new CartManager('./src/carrito.json')

const cartRouter = Router()


cartRouter.post('/', async (req, res) => {
    const cart = req.body;
    try{
        const result = await cartManager.addCart(cart);
        res.send(result);
    }
    catch(err){
        console.log("Error al agregar el carrito");
    }
})

cartRouter.get('/:cid', async (req, res) => {
  const cid = req.params.cid
  const cart = await cartManager.getCartById(cid)
  if (cart) {
    if(cart.products.length < 1){
      res.send({message : "Carrito Vacío"})
    }
    else{
      res.send(cart.products)}
    }
  else res.status(404).send({ error: 'Carrito no encontrado' })
})

cartRouter.post('/:cid/product/:pid', async(req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const product = {
    id : pid,
    quantity: 1
  }
  try{
        const result = await cartManager.addProductToCart(cid, product)
        res.send(result);
    }
    catch(err){
        console.log("Error al agregar el producto");
    }
})

export default cartRouter