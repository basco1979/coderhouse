import mongoose from "mongoose";
import config from "../../config/config.js";

let Products;

switch (config.persistence) {
    case 'MONGO':
        const {default : ProductMongo} = await import('../mongo/products.mongo.js');
        mongoose.connect(config.mongoUrl);
        Products = ProductMongo;    
        break;

    case 'MEMORY':
        const {default : ProductMemory} = await import ('../memory/products.memory.js');
        Products = ProductMemory;
    break;
}

export default Products;