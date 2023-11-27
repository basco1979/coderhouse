import fs from 'fs'

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  static id = 0

  async addProduct(product) {
    if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
        return console.log('Missing data for product registration');
    }
    const products = await this.getProducts();
    let maxCode = products.length === 0 ? 0 :  Math.max.apply(Math, products.map(function(o) { return o.id; }))
    product.id = maxCode+1;
    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
  }

  async getProducts() {
     try {
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const parsedProducts = JSON.parse(productos);
      return parsedProducts;
    } catch (error) {
      console.log("No hay productos");
      return [];
    }
  }


  async getProductById(id){
    const products = await this.getProducts();
     const product = products.find(product => Number(product.id) === Number(id));
    if(product){
      return product
    } else{
      console.log("Product Id doesn´t exists")
    }
  }

async updateProduct(id, newProduct){
    const products = await this.getProducts();
     const product = products.find(product => product.id === id);
     if(newProduct.title) product.title = newProduct.title
     if(newProduct.description) product.description = newProduct.description
     if(newProduct.price) product.price = newProduct.price
     if(newProduct.thumbnail) product.thumbnail = newProduct.thumbnail
     if(newProduct.code) product.code = newProduct.code
     if(newProduct.stock) product.stock = newProduct.stock
    await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
     
}

async deleteProduct(id){
    const products = await this.getProducts();
     const product = products.find(product => product.id === id);
     if(product){
      const newProd = products.filter(prod => prod.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(newProd), 'utf-8');
     }
     else{
      console.log("Product Id doesn´t exists")
     }
}
}


/* const test = async() => {

const productManager = new ProductManager('./productManager.json')

let listado = await productManager.getProducts() 
console.log(listado)
const product1 = {
  'title' : 'producto prueba',
  'description':'Este es un producto prueba',
  'price' : 200,
  'thumbnail' : 'Sin Imagen',
  'code' : 'abc123',
  'stock': 25
}
const product2 = {
  'title' : 'producto prueba2',
  'description':'Este es un producto prueba',
  'price' : 100,
  'thumbnail' : 'Sin Imagen',
  'code' : 'abc124',
  'stock': 20
}
await productManager.addProduct(product1)
await productManager.addProduct(product2)
listado = await productManager.getProducts() 
console.log(listado)
const productID = await productManager.getProductById(2)
console.log("Product ID: ", productID)
await productManager.updateProduct(2, {title: 'producto modificado'})
listado = await productManager.getProducts() 
console.log("Listado con producto modificado", listado)
await productManager.deleteProduct(2)
listado = await productManager.getProducts() 
console.log("Listado con producto eliminado 2", listado)
await productManager.deleteProduct(3)
listado = await productManager.getProducts() 
console.log("Listado con producto eliminado 3", listado)

}

test() */