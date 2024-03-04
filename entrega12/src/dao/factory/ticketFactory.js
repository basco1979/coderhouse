import mongoose from "mongoose";
import config from "../../config/config.js";

let Tickets;

switch (config.persistence) {
    case 'MONGO':
        const {default : TicketMongo} = await import('../mongo/ticket.mongo.js');
        mongoose.connect(config.mongoUrl);
        Tickets = TicketMongo;    
        break;

    case 'MEMORY':
        const {default : TicketMemory} = await import ('../memory/ticket.memory.js');
        Tickets = TicketMemory;
    break;
}

export default Tickets;