import { Router } from 'express'
import { productModel } from '../dao/models/product.model.js'

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
  res.render('products', {products})
})

export default viewsRouter
