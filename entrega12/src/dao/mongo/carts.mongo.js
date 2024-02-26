import { cartModel } from "../models/cart.model.js";

export default class Carts {
    constructor(){}

    get = async () => {
        const carts = await cartModel.find()
        return carts;
    }

    post = async (cart) => {
        try {
            const result = await cartModel.create(cart);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    put = async (id, cart) => {
        try {
            const result = await cartModel.findOneAndUpdate({_id: id}, cart);
            return true;
        } catch (error) {
            return false;
        }
    }

    delete = async (id) => {
        try {
            const result = await cartModel.deleteOne({_id: id});
            return true;
        } catch (error) {
            return false;
        }
    }
}