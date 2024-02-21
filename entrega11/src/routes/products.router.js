import { Router } from 'express'
import ProductManagerDB from '../dao/productManagerDB.js'
import { productModel } from '../dao/models/product.model.js'
import { deleteProduct, getProductById, getProducts, postProduct, putProduct } from '../controllers/products.controller.js'

const productManager = new ProductManagerDB()

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get('/:pid', getProductById)

productRouter.post('/', postProduct)

productRouter.put('/:pid', putProduct)

productRouter.delete('/:pid', deleteProduct)

export default productRouter
