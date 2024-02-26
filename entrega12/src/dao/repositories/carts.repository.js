import CartDTO from "../../dtos/cart.dto.js";

export default class CartRepository {
    constructor(dao){
        this.dao = dao;
    }

    getCarts = () => {
        const result = this.dao.get();
        return result;
    }

    createCart =  (cart) => {
        const newCart = new CartDTO(cart);
        const result = this.dao.post(newCart);
        return result;
    }

}