import { Router } from 'express'
import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from '../controllers/products.controller.js'

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get('/:pid', getProductById)

productRouter.post('/', postProduct)

productRouter.put('/:pid', putProduct)

productRouter.delete('/:pid', deleteProduct)

export default productRouter
