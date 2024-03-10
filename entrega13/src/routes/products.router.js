import { Router } from './router.js'
import {
  deleteProduct,
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from '../controllers/products.controller.js'

export default class ProductsRouter extends Router {
  init() {
    this.get('/',['PUBLIC'], getProducts)

    this.get('/:pid',['PUBLIC'], getProductById)

    this.post('/', ['ADMIN'], createProduct)

    this.put('/:pid', ['ADMIN'], updateProduct)

    this.delete('/:pid', ['ADMIN'], deleteProduct)
  }
}
