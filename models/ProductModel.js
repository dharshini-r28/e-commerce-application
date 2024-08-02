const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    id:{
        type:String,
        
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
    },
    rating:{
        rate:{
            type:Number,
        },
        count:{
            type:Number,
        },
    },


})
const ProductModel=mongoose.model("products",productSchema)

module.exports = ProductModel;
























