import mongoose from "mongoose";
import config from "../../config/config.js";

let Messages;

switch (config.persistence) {
    case 'MONGO':
        const {default : MessageMongo} = await import('../mongo/messages.mongo.js');
        mongoose.connect(config.mongoUrl);
        Messages = MessageMongo;    
        break;

    case 'MEMORY':
        const {default : MessageMemory} = await import ('../memory/messages.memory.js');
        Messages = MessageMemory;
    break;
}

export default Messages;