import { Router } from 'express'
import CartManagerDB from '../dao/cartManagerDB.js'

const cartManager = new CartManagerDB()

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
  const { cid } = req.params
  console.log(cid)
  const { pid } = req.params
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

cartRouter.delete('/:cid/product/:pid', async(req, res) => {
  const { cid , pid} = req.params
  const cart = await cartManager.getCartById(cid)
  
  let index = cart.products.find((item) => item.id === pid)
  if(index){
    cart.products.pull(index)
    await cart.save()
    .then(()=>{res.status(200).send('Eliminado correctamente')})
    .catch((err)=>{console.log(err)})
  }else{
    res.send({message:"No existe el ID"})
  }  
})

cartRouter.put('/:cid', async(req, res) => {
  //no entiendo que hace esto
})

cartRouter.put('/:cid/product/:pid', async(req, res) => {
  const { cid , pid} = req.params
  const cart = await cartManager.getCartById(cid)
  let index;
  for (let i=0 ;i<cart.products.length;i++){
    if (cart.products[i].id == pid) {index = i;}
    }
 cart.products[index].quantity = req.body.quantity
 try {
  await cartManager.updateCart(cid, cart)
    res.json(cart.products[index])
 } catch (error) {
        console.log("Error al actualizar el producto");  
 }
})

cartRouter.delete('/:cid', async(req, res) => {
  const { cid } = req.params
  const cart = await cartManager.getCartById(cid)
  cart.products = []
try {
  await cartManager.updateCart(cid, cart)
    res.json(cart.products)
 } catch (error) {
        console.log("Error al vaciar el carrito");  
 }
})

export default cartRouter