
import Users from "../factory/userFactory.js";
import Products from "../factory/productFactory.js";
import Messages from "../factory/messageFactory.js";
import Carts from "../factory/cartFactory.js";

import UserRepository from "./users.repository.js";
import ProductRepository from "./products.repository.js";
import CartRepository from "./carts.repository.js";
import MessageRepository from "./messages.repository.js";

export const usersService = new UserRepository(new Users());
export const productsService = new ProductRepository(new Products());
export const messagesService = new MessageRepository(new Messages());
export const cartsService = new CartRepository(new Carts());