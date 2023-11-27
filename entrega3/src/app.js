import  express from 'express'
import ProductManager from './productManager.js'

const productManager = new ProductManager('./src/productManager.json')
const app = express()
app.use(express.urlencoded({ extended: true}))

app.get('/products', async (req, res)=> {
let listado = await productManager.getProducts()
const limite = req.query.limit;
if(limite){
const newListado = []
for(let i = 0; i < listado.length; i++){
    if(i < limite){
        newListado.push(listado[i])
        }
    }
res.send(newListado)
}else{
res.send(listado)
}
})

app.get('/products/:pid', async (req, res) => {
const pid = req.params.pid;
const product = await productManager.getProductById(pid)
if(product) res.send(product)
else res.status(404).send({'error': 'Producto no encontrado'})
})

app.listen(8080, () => {
    console.log("Servidor arriba en el puerto 8080")
})