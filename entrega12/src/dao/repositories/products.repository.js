import ProductDTO from '../../dtos/product.dto.js'

export default class ProductRepository {
  constructor(dao) {
    this.dao = dao
  }

  getProducts = () => {
    const result = this.dao.get()
    return result
  }

  getProductById = async (id) => {
    const products = await this.getProducts()
    const product = products.find((prod) => prod.id === id)
    if (product) {
      return product
    } else {
      console.log('Id no existe')
    }
  }

  createProduct = async (product) => {
    const newProduct = new ProductDTO(product);
    const result = this.dao.post(newProduct)
    return result
  }
}
