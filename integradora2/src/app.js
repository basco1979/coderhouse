import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import session from 'express-session'
import  MongoStore  from 'connect-mongo'
import { secret } from './config/consts.js'
import viewsRoutes from './routes/views.routes.js'
import sessionRoutes from './routes/session.routes.js'
import initializePassport from './config/passport.js'
import passport from 'passport'

const app = express()
const PORT = 8080

mongoose.connect(('mongodb+srv://basko:admin123@cluster0.bstyb.mongodb.net/coder'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
})
app.engine('handlebars', hbs.engine)
app.set('views', 'src/views')
app.set('view engine', 'handlebars')

app.use(session(
    {
        secret: secret,
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://basko:admin123@cluster0.bstyb.mongodb.net/coder'
        }),
        resave: true,
        saveUninitialized: true
    }
))



app.use('/', viewsRoutes)
app.use('/api/session', sessionRoutes)


initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})