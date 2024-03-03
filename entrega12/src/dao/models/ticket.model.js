import mongoose from 'mongoose'
const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code : {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type:String,
        required: true
        },
    price : {
        type: Number,
        required: true
    },
    thumbnail : {
        type: Array  // image url
    },
    code: {
        type: String,
        required : true,
        unique:true,
    },
    stock: {
        type:Number,
        required: true
    },
    status: {
        type: Boolean,
        default : true
    },
    category: {
        type : String,
        required : true
    }
},
{
    timestamps: true
})

ticketSchema.plugin(mongoosePaginate)
export const ticketModel = mongoose.model(ticketCollection, ticketSchema)