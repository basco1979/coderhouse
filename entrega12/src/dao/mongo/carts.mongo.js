import { cartModel } from "../models/cart.model.js";

export default class Carts {
    constructor(){}

    getCarts = async () => {
        const carts = await cartModel.find()
        return carts;
    }

    getCartById = async (id) => {
        try {
            const result = await cartModel.findOne({_id: id});
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    saveCart = async (cart) => {
        try {
            const result = await cartModel.create(cart);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    updateCart = async (id, cart) => {
        try {
            const result = await cartModel.findOneAndUpdate({_id: id}, cart);
            return true;
        } catch (error) {
            return false;
        }
    }

    deleteCart = async (id) => {
        try {
            const result = await cartModel.deleteOne({_id: id});
            return true;
        } catch (error) {
            return false;
        }
    }
}