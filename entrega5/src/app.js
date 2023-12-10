import  express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'

const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname+'/views')

app.set('view engine', 'handlebars')

app.use(express.static(__dirname+'/public'))

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

app.listen(PORT, () => {
    console.log("Servidor arriba en el puerto 8080")
})