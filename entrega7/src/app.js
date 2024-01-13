import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import { messageModel } from "./dao/models/message.model.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
})

app.engine("handlebars", hbs.engine);

app.set("views", "src/views");

app.set("view engine", "handlebars");


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

mongoose.connect('mongodb+srv://basko:admin123@cluster0.bstyb.mongodb.net/ecommerce')

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
