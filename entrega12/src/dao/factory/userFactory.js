import mongoose from "mongoose";
import config from "../../config/config.js";

let Users;

switch (config.persistence) {
    case 'MONGO':
        const {default : UserMongo} = await import('../mongo/users.mongo.js');
        mongoose.connect(config.mongoUrl);
        Users = UserMongo;    
        break;

    case 'MEMORY':
        const {default : UserMemory} = await import ('../memory/users.memory.js');
        Users = UserMemory;
    break;
}

export default Users;