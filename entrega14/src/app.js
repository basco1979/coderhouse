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
import cartsRouter from './routes/carts.router.js';
import sessionRouter from './routes/session.routes.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import ticketsRouter from './routes/tickets.routes.js';
import mockingRouter from './routes/mocking.routes.js';
import { Command } from 'commander'
import { ErrorHandler } from './middlewares/error.js';
import compression from 'express-compression';
import { addLogger } from './utils/logger.js';


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

// Routing
app.use(addLogger)
app.get('/loggerTest', (req, res) =>{
    req.logger.info("Info message")
    req.logger.warning("Warning message")
    req.logger.error("Error message")
    req.logger.fatal("Fatal message")
    res.send({message: "Error"})
})
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/tickets', ticketsRouter)
app.use('/mockingproducts', mockingRouter)
//app.use(ErrorHandler)

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
