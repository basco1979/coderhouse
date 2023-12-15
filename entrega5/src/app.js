import express from "express";
import fs from 'fs'
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./productManager.js";

const productManager = new ProductManager("./src/productos.json");

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(httpServer);

const products = await productManager.getProducts()

io.on("connect",  (socket) => {
    console.log("Nuevo cliente conectado");

  io.emit("ProdLogs", products);
  socket.on("product", async(prod) => {
    await productManager.addProduct(prod)
});
});
