import { Router } from 'express'
import { productModel } from '../dao/models/product.model.js'
import CartManagerDB from '../dao/cartManagerDB.js'
const cartManager = new CartManagerDB()
const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
  res.render('chat', {title: 'Chat', style: 'chat.css'})
})

viewsRouter.get('/products', async (req, res) => {
  let { page } = req.query
  if (!page || isNaN(Number(page))) page = 1
  const products = await productModel.paginate({}, {limit:10,page:page} )
  products.prevLink = `/products/?page=${Number(page)-1 }`
  products.nextLink = `/products/?page=${Number(page)+1 }`
  res.render('products', {products, title: 'Products', style : 'products.css'})
})

viewsRouter.get('/:cid/add/:pid', async(req, res) => {
  const {pid, cid } = req.params
  try{

        await cartManager.addProductToCart(cid, pid)
        res.redirect('/products');
    }
    catch(err){
        console.log("Error al agregar el producto");
    }
})

viewsRouter.get('/cart/:cid', async(req, res) => {
  const {cid} = req.params
  const cart = await cartManager.getCartById(cid)
  //let subtotal = cart.products.forEach(item => Number(item.quantity) * Number(item.product.price))
  //console.log(subtotal)
  if (cart) {
    if(cart.products.length < 1){
      res.send({message : "Carrito Vacío"})
    }
    else{
      res.render('cart', {cart})}
    }
  else res.status(404).send({ error: 'Carrito no encontrado' })
})

export default viewsRouter
