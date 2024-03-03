import MongoStore from 'connect-mongo';
import express from "express";
import cors from 'cors'
import session from 'express-session';
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import cartRouter from "./routes/carts.router.js";
import mongoose from "mongoose";
import { messageModel } from "./dao/models/message.model.js";
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import config from './config/config.js';
import SessionRouter from './routes/session.routes.js';
import ProductsRouter from './routes/products.router.js';
import ViewsRouter from './routes/views.router.js';


const PORT = config.port;
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: config.secret,
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
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

const productRouter = new ProductsRouter()
app.use("/api/products", productRouter.getRouter());
app.use("/api/carts", cartRouter);
const viewsRouter = new ViewsRouter()
app.use("/", viewsRouter.getRouter());
const sessionRouter = new SessionRouter();
app.use('/api/session', sessionRouter.getRouter());

mongoose.connect(config.mongoUrl)

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
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
