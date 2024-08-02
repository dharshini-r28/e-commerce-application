const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const ProductRouter=require('./routes/productRoutes')
const UserRouter=require('./routes/userRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')
require('dotenv').config();
const mongoose=require('mongoose')
const cors=require('cors')
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongodb connected")
})
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.set("view engine","ejs");
app.use('/',ProductRouter);
app.use('/user', UserRouter);
app.use('/cart',cartRoutes)
app.use('/order',orderRoutes);
app.listen(8000,()=>{
    console.log("server is running on the port 8000")
})
