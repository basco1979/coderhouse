import { productModel } from "../models/product.model.js";

export default class Products {
    constructor(){}

    get = async () => {
        const products = await productModel.find()
        return products;
    }

    post = async (product) => {
        try {
            const result = await productModel.create(product);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    put = async (id, product) => {
        try {
            const result = await productModel.findOneAndUpdate({_id: id}, product);
            return true;
        } catch (error) {
            return false;
        }
    }

    delete = async (id) => {
        try {
            const result = await productModel.deleteOne({_id: id});
            return true;
        } catch (error) {
            return false;
        }
    }
}