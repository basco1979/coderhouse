import { Router } from 'express'
import ProductManager from '../productManager.js'

const productManager = new ProductManager('./src/productos.json')
const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
  let listado = await productManager.getProducts()
  res.render('home', {listado, title: 'Productos', style: 'home.css'})
})

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {})
})

export default viewsRouter
