import MongoStore from 'connect-mongo';
import express from "express";
import cors from 'cors'
import session from 'express-session';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import { messageModel } from "./dao/models/message.model.js";
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { getVariables } from './config/config.js';
import CartsRouter from "./routes/carts.router.js";
import SessionRouter from './routes/session.routes.js';
import ProductsRouter from './routes/products.router.js';
import ViewsRouter from './routes/views.router.js';
import TicketsRouter from './routes/tickets.routes.js';
import { Command } from 'commander'
import mockingRouter from './routes/mocking.routes.js';
import { ErrorHandler } from './middlewares/error.js';


const app = express();
const program = new Command()
program.option('--persistence <persistence>')
const options = program.parse()
const { mongoUrl, port, secret} = getVariables(options)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression({
    brotli: {enabled: true, zlib: {}}
}));

app.use(session({
    secret: secret,
    store: MongoStore.create({
        mongoUrl: mongoUrl,
    }),
    resave: true,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
})

app.engine("handlebars", hbs.engine);
app.set("views", "src/views");
app.set("view engine", "handlebars");

const viewsRouter = new ViewsRouter()
const productRouter = new ProductsRouter()
const cartRouter = new CartsRouter()
const sessionRouter = new SessionRouter();
const ticketRouter = new TicketsRouter()

app.use("/", viewsRouter.getRouter());
app.use("/api/products", productRouter.getRouter());
app.use("/api/carts", cartRouter.getRouter());
app.use('/api/session', sessionRouter.getRouter());
app.use('/api/tickets', ticketRouter.getRouter())
app.use('/mockingproducts', mockingRouter)
app.use(ErrorHandler)

mongoose.connect(mongoUrl)

const httpServer = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
const io = new Server(httpServer)

io.on('connect', socket => {
    console.log("Nuevo Cliente Conectado")
    socket.on('message', async (data) => {
        messageModel.create(data)
        io.emit('messageLogs', await messageModel.find())
    });
    
    socket.on('newUser', user => {
        io.emit('newConnection', "Un nuevo usuario se conecto")
        socket.broadcast.emit('notification', user)
    })
})
