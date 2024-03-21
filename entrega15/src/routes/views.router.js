import { Router } from "express";
import { checkAuth, checkExistingUser, isAdmin, isUser, isUserOrAdmin } from "../middlewares/auth.js";
import {
  addProductToCart,
  getCartDetailPage,
  getChatPage,
  getFailLoginPage,
  getFailRegisterPage,
  getIndexPage,
  getLoginPage,
  getProductsPage,
  getRegisterPage,
  restorePassword,
  createProductPage,
  updateProductPage,
  deleteProductPage

} from "../controllers/views.controller.js";

const viewsRouter = Router();
viewsRouter.get("/", checkAuth, getIndexPage);

viewsRouter.get("/login", checkExistingUser, getLoginPage);

viewsRouter.get("/register", checkExistingUser, getRegisterPage);

viewsRouter.get("/chat", isUser, getChatPage);

viewsRouter.get("/products", isUserOrAdmin , getProductsPage);

viewsRouter.get("/:cid/add/:pid", isUser, addProductToCart);

viewsRouter.get("/cart/:cid", isUser, getCartDetailPage);

viewsRouter.get(
  "/restore-password",
  checkExistingUser,
  restorePassword
);

viewsRouter.get("/failregister", getFailRegisterPage);

viewsRouter.get("/faillogin", getFailLoginPage);

viewsRouter.get("/create-product", createProductPage);
viewsRouter.get("/update-product/:pid", updateProductPage);
viewsRouter.get("/delete-product", deleteProductPage);


export default viewsRouter;
