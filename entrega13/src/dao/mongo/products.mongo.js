import { generateProductErrorInfo, generateSingleIdError } from '../../services/errors/info.js'
import { productModel } from '../models/product.model.js'

export default class Products {
  constructor() {}

  getProducts = async () => {
    const products = await productModel.find()
    return products
  }

  getProductById = async (id) => {
      const result = await productModel.findOne({ _id: id })
      if (!result) {
        CustomErrors.createError({
          name: 'find product failed',
          cause: generateSingleIdError(id),
          message: 'Id does not exists',
          code: ErrorEnum.ID_NOT_FOUND,
        })
      }
      return result
  }

  saveProduct = async (product) => {
      const result = await productModel.create(product)
        if(!result){
          CustomErrors.createError({
          name: 'product creation failed',
          cause: generateProductErrorInfo(product),
          message: 'Error trying to create product',
          code: ErrorEnum.INVALID_TYPE_ERROR,
        })  
        }
      return true
    
  }

  updateProduct = async (id, product) => {
    try {
      const result = await productModel.findOneAndUpdate({ _id: id }, product)
      return true
    } catch (error) {
      return false
    }
  }

  deleteProduct = async (id) => {
    try {
      const result = await productModel.deleteOne({ _id: id })
      return true
    } catch (error) {
      return false
    }
  }
}
