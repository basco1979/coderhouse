class ProductManager {
  constructor() {
    this.products = []
  }

  static id = 0

  addProduct(title, description, price, thumbnail, code, stock) {
    ProductManager.id++
    const product = {
      id: ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    if (this.products.find((e) => e.code === product.code)) {
      console.log('The product already exists')
    }
    else if(!title || !description || !price || !thumbnail || !code || !stock){
      console.log('Missing data for product registration')
    }

    this.products.push(product)
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    const product = this.products.find((prod) => prod.id === id)
    if (!product) {
      console.log('Not Found')
    }
    return product
  }
}

const productManager = new ProductManager()

console.log(productManager.getProducts())

productManager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin Imagen',
  'abc123',
  25
)

console.log(productManager.getProducts())

productManager.addProduct(
  'producto prueba',
  'Este es un producto prueba',
  200,
  'Sin Imagen',
  'abc123',
  25
)

productManager.addProduct(
  'producto prueba 2',
  'Este es un producto prueba - faltan datos',
  200,
  'Sin Imagen',
  'abc1234',
)


productManager.getProductById('aaa')

productManager.getProductById(1)
