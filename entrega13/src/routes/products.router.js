import { Router } from "express";
import { isAdmin} from '../middlewares/auth.js'
import {
  deleteProduct,
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:pid", getProductById);
productsRouter.post("/", isAdmin, createProduct);
productsRouter.put("/:pid", isAdmin, updateProduct);
productsRouter.delete("/:pid", isAdmin, deleteProduct);

export default productsRouter;