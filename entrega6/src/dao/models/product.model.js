import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
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

export const productModel = mongoose.model(productCollection, productSchema)