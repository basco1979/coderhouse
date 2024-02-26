import mongoose from "mongoose";
import config from "../../config/config.js";

let Carts;

switch (config.persistence) {
    case 'MONGO':
        const {default : CartMongo} = await import('../mongo/carts.mongo.js');
        mongoose.connect(config.mongoUrl);
        Carts = CartMongo;    
        break;

    case 'MEMORY':
        const {default : CartMemory} = await import ('../memory/carts.memory.js');
        Carts = CartMemory;
    break;
}

export default Carts;