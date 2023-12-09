import { Router } from 'express'
import ProductManager from '../productManager.js'

const productManager = new ProductManager('./src/productos.json')

const productRouter = Router()

productRouter.get('/', async (req, res) => {
  let listado = await productManager.getProducts()
  const limite = req.query.limit
  if (limite) {
    const newListado = []
    for (let i = 0; i < listado.length; i++) {
      if (i < limite) {
        newListado.push(listado[i])
      }
    }
    res.send(newListado)
  } else {
    res.send(listado)
  }
})

productRouter.get('/:pid', async (req, res) => {
  const pid = req.params.pid
  const product = await productManager.getProductById(pid)
  if (product) res.send(product)
  else res.status(404).send({ error: 'Producto no encontrado' })
})

productRouter.post('/', async(req, res) => {
    const product = req.body;
    try{
        const result = await productManager.addProduct(product);
        res.status(201).send(result);
    }
    catch(err){
        console.log("Error al agregar el producto");
    }
})

productRouter.put('/:pid', async(req, res) => {
    const productId = req.params.pid
    const product = req.body;
    try{
        const result = await productManager.updateProduct(productId, product);
        res.send(result);
    }
    catch(err){
        console.log("Error al actualizar el producto");
        }
})

productRouter.delete('/:pid', async (req, res) => {
    const product = req.params.pid
    try{
        const result = await productManager.deleteProduct(product);
        res.send(result);
        }
        catch(err){
            console.log('error', err);
        }
})

export default productRouter
