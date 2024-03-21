import CartManagerDB from "../dao/cartManagerDB.js";
import { productModel } from "../dao/models/product.model.js";

const cartManager = new CartManagerDB();

export const getIndexPage = (req, res) => {
  const { user } = req.session;
  res.render("index", user);
};

export const getLoginPage = (req, res) => {
  res.render("login");
};

export const getRegisterPage = (req, res) => {
  res.render("register");
};

export const getChatPage = async (req, res) => {
  res.render("chat", { title: "Chat", style: "chat.css" });
};

export const getProductsPage = async (req, res) => {
  const { first_name, last_name, role, cartId } = req.session.user;
  let { page } = req.query;
  if (!page || isNaN(Number(page))) page = 1;
  const products = await productModel.paginate({}, { limit: 10, page: page });
  products.prevLink = `/products/?page=${Number(page) - 1}`;
  products.nextLink = `/products/?page=${Number(page) + 1}`;
  res.render("products", {
    first_name,
    last_name,
    role,
    cartId,
    products,
    cartId,
    title: "Products",
    style: "products.css",
  });
};

export const addProductToCart = async (req, res) => {
  const { pid, cid } = req.params;
  try {
    await cartManager.addProductToCart(cid, pid);
    res.redirect("/products");
  } catch (err) {
    req.logger.error(
      `${new Date().toLocaleTimeString()} -Error to add product to cart` + err
    );
    res.status(500).send("Internal Server Error");
  }
};

export const getCartDetailPage = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  //let subtotal = cart.products.forEach(item => Number(item.quantity) * Number(item.product.price))
  //console.log(subtotal)
  if (cart) {
    if (cart.products.length < 1) {
      res.send({ message: "Empty Cart" });
    } else {
      res.render("cart", { cart });
    }
  } else res.status(404).send({ error: "Cart not found" });
};

export const restorePassword = (req, res) => {
  res.render("restore-password");
};

export const getFailRegisterPage = (req, res) => {
  res.render("failregister");
};

export const getFailLoginPage = (req, res) => {
  res.render("faillogin");
};

export const createProductPage = (req, res) => {
  res.render("create-product");
};

export const updateProductPage = async (req, res) => {
  const { pid } = req.params;
  try{
  const product = await productModel.findOne({ _id: pid });
  res.render("update-product", product);
  }
  catch(err){
    req.logger.error("Error", err)
  }
};

export const deleteProductPage = (req, res) => {
  res.render("delete-product");
};
